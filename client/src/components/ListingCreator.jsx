import React from 'react';
import { Button, Segment, Icon, Divider,
   Container, Modal, Input, TextArea } from 'semantic-ui-react';

class ListingCreator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listing : {
        title: '',
        image: '',
        desc: '',
        loc: '',
      },
      isOpen: false
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

  handleChange(key, event){
    const listing = this.state.listing;
    listing[key] = event.target.value;
    this.setState({listing: listing});
  }

  fileSelectedHandler(event){
    let file = event.target.files[0]
    this.setState(state=>{
      state.listing.image = file
    })
  }

  submit(){
    this.props.createListing(this.state.listing, this.props.user._id);
    this.close();
  }

  render(){
    return(
    <Modal open={this.state.isOpen} trigger={<div className="ui item" onClick={this.open.bind(this)}>
        <Icon className='clipboard outline'/>
        Create A New Listing</div>} closeOnDimmerClick={false}>
      <Modal.Header>New Listing</Modal.Header>
      <div>
        <Container textAlign="center">
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
        <div className="upload-btn-wrapper">
          <button className="btn"><Icon name="upload"></Icon>UPLOAD A IMAGE</button>
          <input onChange={this.fileSelectedHandler.bind(this)} type="file"
          name="myfile"/>
        </div>
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
        </Container>
      </div>

      <Container textAlign="center">
        <Segment>
          <Input label="Title" onChange={this.handleChange.bind(this, 'title')} value={this.state.listing.title}
          placeholder="Name" style={{'paddingRight': '20px'}}/>
          <Input label="Location" onChange={this.handleChange.bind(this, 'loc')} value={this.state.listing.loc}
          placeholder="Zip-Code, City, or Full Address"/>
        </Segment>
        <TextArea onChange={this.handleChange.bind(this, 'desc')} value={this.state.listing.desc}
        autoHeight cols="60" placeholder='Short Description' />
      </Container>
      <Modal.Actions>
        <Button type="button" onClick={this.close.bind(this)} basic color='red'>
          <Icon name='remove'/>Cancel
        </Button>
        <Button primary type="button" onClick={this.submit.bind(this)}>
          Proceed <Icon name='right chevron' />
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

export default ListingCreator
