import React from 'react';
import {Button, Header, Icon, List, Modal} from 'semantic-ui-react';
import MyListingEntry from './MyListingEntry.jsx';

class MyListings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
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
        My Listings</div>} basic size='small'>
        <Header icon='browser' content='My Listings' />
        <Modal.Content>
          {
            (this.props.listings || []).map(entry =>
              entry.listedBy === this.props.user._id ?
              <List divided verticalAlign='middle' key={entry._id}>
                <MyListingEntry listing={entry} delete={this.props.delete.bind(this)}
                listingSelectHandler={this.props.listingSelectHandler.bind(this)} close={this.close.bind(this)} giveHandler={this.props.giveHandler.bind(this)}/>
              </List> : false
            )
          }
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.close.bind(this)} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default MyListings;