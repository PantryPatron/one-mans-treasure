import axios from "axios";
import $ from "jquery";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Container} from "semantic-ui-react";
import {fetchListings, setQuery} from "../actions/ListingActions";
import store from "../index.jsx";
import {
    createListingService,
    deleteListingService,
    givawayListingService,
    listingInterestService,
    updateListingService,
} from "../services/listingService.js";
import {loginService, signupService} from "../services/userService.js";
import ListingDetails from "./ListingDetails.jsx";
import Listings from "./Listings.jsx";
import NavBar from "./NavBar.jsx";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            loginAs: { user: { username: "Anonymous", _id: null, karma: null } },
            view: "listings",
            selectedListing: "",
            karma: null,
            comments: [],
            hasError: false,
            errorMessage: "",
        };
    }

    static getDerivedStateFromError(error) {
        console.error("Error in App component:", error);
        // Update state so the next render will show the fallback UI.
        return { hasError: true, errorMessage: error.toString() };
    }

    componentDidCatch(error, info) {
        console.error("Error caught in App:", error, info);
        this.setState({
            hasError: true,
            errorMessage: error.toString(),
        });
    }

    renderBody() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong. {this.state.errorMessage}</h1>;
        } else if (this.state.view === "listings") {
            if (Array.isArray(this.props.listings.listings) && this.props.listings.listings.length === 0) {
                return (
                    <div className="ui center aligned segment">
                        <h2>No listings available</h2>
                        <p>Try searching for something else or create a new listing!</p>
                    </div>
                );
            }

            if (this.props.listings.error) {
                return (
                    <div className="ui center aligned segment">
                        <h2>Error fetching listings</h2>
                        <p>{this.props.listings.error}</p>
                    </div>
                );
            }

            if (this.props.listings.loading) {
                return (
                    <div className="ui active centered inline loader">
                        <h2>Loading listings...</h2>
                    </div>
                );
            }

            if (this.props.listings.query) {
                return (
                    <div className="ui center aligned segment">
                        <h2>Search Results for "{this.props.listings.query}"</h2>
                    </div>
                );
            }

            // Render the listings component with the listings data
            return (
                <Listings
                    interestHandler={this.markInterest.bind(this)}
                    selectHandler={this.listingSelectHandler.bind(this)}
                    listings={this.props.listings.listings}
                />
            );
        } else if (this.state.view === "single") {
            if (!this.state.selectedListing) {
                return (
                    <div className="ui center aligned segment">
                        <h2>No listing selected</h2>
                        <p>Please select a listing to view details.</p>
                    </div>
                );
            }

            // Render the ListingDetails component with the selected listing
            if (
                !this.state.selectedListing ||
                typeof this.state.selectedListing !== "object" ||
                !("_id" in this.state.selectedListing)
            ) {
                return (
                    <div className="ui center aligned segment">
                        <h2>Loading listing details...</h2>
                    </div>
                );
            }

            // Ensure that the map is available before rendering ListingDetails
            if (!this.state.map) {
                return (
                    <div className="ui center aligned segment">
                        <h2>Loading map...</h2>
                    </div>
                );
            }
            return (
                <ListingDetails
                    user={this.state.loginAs}
                    map={this.state.map}
                    listing={this.state.selectedListing}
                    comments={this.state.comments}
                    updateChanges={this.updateChanges.bind(this)}
                    fetchOneListing={this.updateSelectedListing.bind(this)}
                />
            );
        }
    }

    render() {
        return (
            <div>
                <NavBar
                    searchListings={this.props.fetchListings}
                    listings={this.props.listings.listings}
                    session={this.state.loginAs}
                    create={this.createAccount.bind(this)}
                    createListing={this.createListing.bind(this)}
                    delete={this.deleteListing.bind(this)}
                    homeHandler={this.homeHandler.bind(this)}
                    login={this.userLogin.bind(this)}
                    logout={this.userLogout.bind(this)}
                    listingSelectHandler={this.listingSelectHandler.bind(this)}
                    giveHandler={this.giveHandler.bind(this)}
                    karma={this.state.karma}
                />

                <Container>{this.renderBody()}</Container>
            </div>
        );
    }

    componentDidMount() {
        // this.props.fetchListings();
    }

    createListing(listing, userId, cb) {
        createListingService(listing, userId, (response) => {
            this.props.fetchListings();
        });
        this.setState({ karma: (this.state.karma || 0) + 1 });
        if (cb) {
            cb();
        }
    }

    deleteListing(listing) {
        deleteListingService(listing._id, () => {
            this.props.fetchListings();
        });
    }

    markInterest({ interested_users, _id }) {
        var query = store.getState().listings.query;

        if (this.state.loginAs.user._id === null) {
            alert("Please login to claim items!");
            return;
        }
        let user = this.state.loginAs.user._id;
        let index = interested_users.indexOf(user);
        if (index >= 0) {
            listingInterestService(_id, user, true, (serverRes) => {
                this.props.fetchListings(query);
                this.setState({ karma: (this.state.loginAs.user.karma || 0) + 1 });
                // axios.post('/user', { user, claimed}).then(response=>{
                // })
                // console.log('this.state.loginAs = ', this.state.loginAs)
            });
        } else if (index < 0) {
            listingInterestService(_id, user, false, (/*serverRes*/) => {
                this.props.fetchListings(query);
                this.setState({ karma: (this.state.loginAs.user.karma || 0) - 1 });
                // axios.post('/user', user).then(karma => {
                //   this.setState({karma})
                // })
            });
        }
    }

    createAccount(user) {
        debugger;
        signupService(user, (response) => {
            this.setState({
                loginAs: response,
                karma: response.user.karma || 0,
            });
        });
    }

    userLogin(user, callback) {
        loginService(user, (response) => {
            if (response === false) {
                $(".login-error").show();
            } else {
                this.setState({
                    loginAs: response,
                    karma: response.user.karma,
                });

                if (callback) {
                    callback();
                }
            }
        });
    }

    userLogout() {
        this.setState({
            loginAs: null,
            karma: null,
        });
    }

    listingSelectHandler(selected, mapInfo) {
        this.setState({
            view: "single",
            map: mapInfo,
            selectedListing: selected,
        });
    }

    updateSelectedListing(listingId) {
        axios.get(`/fetch/${listingId}`).then((listing) => {
            this.setState({
                selectedListing: listing.data,
            });
        });
    }

    homeHandler() {
        this.setState({
            view: "listings",
            selectedListing: "",
        });
        store.dispatch({
            type: "SET_QUERY",
            payload: "",
        });
        this.props.fetchListings();
    }

    updateChanges(changes, oldListing) {
        updateListingService(changes, oldListing, (/*response*/) => {
            this.props.fetchListings();
        });
    }

    giveHandler(input) {
        givawayListingService(input, (/*response*/) => {
            this.props.fetchListings();
        });
    }
}

const mapStateToProps = ({ listings }) => {
    return { listings };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchListings, setQuery }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
