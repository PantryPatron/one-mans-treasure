import React from 'react'
import { Grid, Segment } from 'semantic-ui-react';
import ListingEntry from '../components/ListingEntry.jsx';

class Listings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedListing : []
    }
  }

  render(){
    if(this.props.listings === undefined || !this.props.listings.length) {
      // if there is nothing to render, apologize
      return(<div className="no-search-results">No results returned, sorry</div>);
    } else {
      // render the hell out of it
      return(
        <Grid doubling columns={4}>
          {this.props.listings.map(listing=>
            <ListingEntry listing={listing} key={listing._id}
            interestHandler={this.props.interestHandler.bind(this)}
            selectHandler={this.props.selectHandler.bind(this)}
            />
          )}
        </Grid>
      )
    }
  }
}

export default Listings;

