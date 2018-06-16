import React from 'react';
import {Grid, Segment, Image, Divider,
  Container, Header, Label, Icon, Button} from 'semantic-ui-react';
import {googleMapService} from '../services/googleMapService';
import $ from 'jquery';

class ListingEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lon: null,
      lat: null,
      formattedAddress: null,
      address: {
          city: null,
          state: null,
          zipcode: null
      },
      disabledClaim: false
    }
  }

  componentDidMount(){
    this.fetchMap();
  }


  fetchMap(){
    googleMapService(this.props.listing.location, (data)=>{
      this.setState({
        lon: data.results[0].geometry.location.lng,
        lat: data.results[0].geometry.location.lat,
        formattedAddress: data.results[0].formatted_address,
        address: {
          city: data.results[0].address_components[2].short_name,
          state: data.results[0].address_components[4].short_name,
          zipcode: data.results[0].address_components[0].short_name
        }
      },this.render.bind(this))
    })
  }

  claimHandler(e){
    this.setState({
      disabledClaim: true
    })
    setTimeout(()=> {
      this.setState({
        disabledClaim: false
      })
    }, 800)
    this.props.interestHandler(this.props.listing)
  }

  render(){
    return(
      <Grid.Column>
        <Segment>
        <Image className="listing-image" src={this.props.listing.photo} onClick={()=>{this.props.selectHandler(this.props.listing, this.state)}} rounded bordered/>
          <Header as="h3" textAlign="center">
            <Header.Content onClick={()=>{this.props.selectHandler(this.props.listing)}}>{this.props.listing.title}</Header.Content>
          </Header>
          <Container textAlign="center">
            <Label color='grey' horizontal>
              {this.state.address.city}, {this.state.address.state} {this.state.address.zipcode}
            </Label>
          </Container>
          <Divider/>
          <Container textAlign="center">
          <Button as='div' labelPosition='right' >
            <Button color='orange' onClick={this.claimHandler.bind(this)} disabled={ this.state.disabledClaim }>
              <Icon className='ticket' />
              Claim
            </Button>
            <Label as='a' basic color='orange' pointing='left'>
              {this.props.listing.interested_users.length}
            </Label>
          </Button>
          </Container>
        </Segment>
      </Grid.Column>
    )
  }
}

export default ListingEntry;
