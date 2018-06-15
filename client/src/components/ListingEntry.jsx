import React from 'react';
import {Grid, Segment, Image, Divider,
  Container, Header, Label, Icon, Button} from 'semantic-ui-react';
import {googleMapService} from '../services/googleMapService';

class ListingEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lon: null,
      lat: null,
      city: null,
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
        city: data.results[0].formatted_address,
      },this.render.bind(this))
    })
  }

  claimHandler(){
    this.props.interestHandler(this.props.listing)
  }

  render(){
    return(
      <Grid.Column>
        <Segment>
        <Image src={this.props.listing.photo} onClick={()=>{this.props.selectHandler(this.props.listing, this.state)}} rounded/>
          <Header as="h3" textAlign="center">
            <Header.Content onClick={()=>{this.props.selectHandler(this.props.listing)}}>{this.props.listing.title}</Header.Content>
          </Header>
          <Container textAlign="center">
            <Label color='grey' horizontal>
              {this.state.city}
            </Label>
          </Container>
          <Divider/>
          <Container textAlign="center">
          <Button as='div' labelPosition='right' >
            <Button color='orange' onClick={this.claimHandler.bind(this)}>
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
