import React from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import Listings from './Listings.jsx';
import Comments from './Comments.jsx';
import ListingDetails from './ListingDetails.jsx';
import {Container} from 'semantic-ui-react'
import {signupService, loginService} from '../services/userService.js';
import {updateListingService, createListingService, givawayListingService,
  listingInterestService, deleteListingService} from '../services/listingService.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchListings, setQuery} from '../actions/ListingActions';
import store from '../index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      loginAs: null,
      view: 'listings',
      selectedListing: '',
      karma: null
    }
  }

  renderBody(){
    if(this.state.view === 'listings'){
      return (<Listings interestHandler={this.markInterest.bind(this)} selectHandler={this.listingSelectHandler.bind(this)}
      listings={this.props.listings.listings}/>)
    } else if(this.state.view === 'single') {
      return <ListingDetails
      user={this.state.loginAs === null ? this : this.state.loginAs.user._id}
      map={this.state.map}
      listing={this.state.selectedListing}
      updateChanges={this.updateChanges.bind(this)}
      />
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

        <Container>
          {this.renderBody()}
        </Container>
      </div>
    )
  }

  componentDidMount(){
    this.props.fetchListings();
  }

  createListing(listing, userId){
    createListingService(listing, userId, (response)=>{
      this.props.fetchListings();
    })
  }

  deleteListing(listing){
    deleteListingService(listing._id, (deleted)=>{
      this.props.fetchListings();
    });
  }

  markInterest ({interested_users, _id}) {
    console.log(store.getState())
    var query = store.getState().listings.query;
    console.log('in markInterest the query is ', query);

    if (this.state.loginAs === null) {
      console.log('Please login to claim items!')
      return;
    }
    let user = this.state.loginAs.user._id;
    let index = interested_users.indexOf(user);
    if (index >= 0) {
      listingInterestService(_id, user, true, (serverRes) => {
        this.props.fetchListings(query);
        this.setState({ karma: this.state.karma -1 })
        // axios.post('/user', { user, claimed}).then(response=>{
        // })
        // console.log('this.state.loginAs = ', this.state.loginAs)
      })
    } else if (index < 0) {
      listingInterestService(_id, user, false ,(serverRes) => {
        this.props.fetchListings(query);
        this.setState({ karma: this.state.karma +1 })
        // axios.post('/user', user).then(karma => {
        //   this.setState({karma})
        // })
      })
    }
  }

  createAccount(user){
    signupService(user, (response)=>{
      this.setState({
        loginAs: response
      })
    })
  }

  userLogin(user){
    loginService(user, (response)=>{
      if(response === false) {
        alert('you messed up dawg');
      } else {
        this.setState({
          loginAs: response,
          karma: response.user.karma
        });
      }
    })
  }

  userLogout(){
    this.setState({
      loginAs: null,
    })
  }

   listingSelectHandler(selected, mapInfo){
    this.setState({
      view: 'single',
      map: mapInfo,
      selectedListing: selected
    })
  }

  homeHandler(){
    this.setState({
      view: 'listings',
      selectedListing: ''
    })
    this.props.fetchListings();
  }

  updateChanges(changes, oldListing){
    updateListingService(changes, oldListing, (response)=>{
      this.props.fetchListings();
    })
  }

  giveHandler(input){
    console.log(input, 'HALLELUJIA')
    givawayListingService(input, (response)=>{
      this.props.fetchListings();
    })
  }
}

const mapStateToProps = ({listings}) =>{
  return {listings};
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchListings, setQuery}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
