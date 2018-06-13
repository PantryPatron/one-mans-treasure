import React from 'react';
import { Button, Header, Icon, Modal, List } from 'semantic-ui-react'
import ClaimListingEntry from './ClaimListingEntry.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchClaimedListings} from '../../actions/ListingActions';

class ClaimListings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount(){
    this.props.fetchClaimedListings(this.props.claimed);
  }

  open(){
    this.setState({
      isOpen:true
    })
  }

  close(){
    this.setState({
      isOpen:false
    })
  }

  render() {
    return (
      <Modal
        open={this.state.isOpen}
        trigger={<div className="ui item" onClick={this.open.bind(this)}>
        <Icon className='list alternate outline'/>
        Claim Listings</div>} basic size='small'>
        <Header icon='browser' content='Claim Listings' />
        <Modal.Content>
          {
            this.props.claimedListings.map(entry =>
              <List divided verticalAlign='middle' key={entry._id}>
                <ClaimListingEntry listing={entry}
                listingSelectHandler={this.props.listingSelectHandler.bind(this)} close={this.close.bind(this)} claimed={this.props.claimed}/>
              </List>
            )
          }
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.close.bind(this)} inverted>
            <Icon className='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = ({claimedListings}) =>{
  return {claimedListings};
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchClaimedListings},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimListings);