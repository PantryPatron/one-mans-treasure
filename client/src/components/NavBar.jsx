import React from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import NavDropdown from './NavDropdown.jsx';
import {Button, Dropdown, Menu, Container, Header, Icon} from 'semantic-ui-react';
import SearchEnhancer from './SearchEnhancer.jsx';
import store from '../index.jsx';

class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayEnhancer: false
    }
  }

  renderSearchEnhancer() {
    return(<SearchEnhancer query={store.getState().listings.query}>{this.state.search}</SearchEnhancer>)
  }

  renderCredential(){
    if(this.props.session === null){
      return(
      <React-fragment>
        <div className="item ui">
          <Button.Group>
            <Login login={this.props.login.bind(this)}/>
            <Button.Or/>
            <Signup create={this.props.create.bind(this)}/>
          </Button.Group>
        </div>
      </React-fragment>
      )
    } else {
      return(
        <Menu.Menu position="right">
          <div className="item ui">
            <Icon link bordered inverted color='orange'name='user' /> {this.props.session.user.username} <Icon linkname='user' size='large' /> <Icon link color='orange' className='gem outline' size='large' /> {this.props.karma}
          </div>
          <NavDropdown
            listings={this.props.listings}
            logout={this.props.logout.bind(this)}
            session={this.props.session}
            createListing={this.props.createListing.bind(this)}
            delete={this.props.delete.bind(this)}
            listingSelectHandler={this.props.listingSelectHandler.bind(this)}
            logout={this.props.logout.bind(this)}
            giveHandler={this.props.giveHandler.bind(this)}>
          </NavDropdown>
        </Menu.Menu>
      )
    }
  }

  render(){
    return(
      <div>
        <div className="ui menu aligned">
          <div className='item'>
              <Icon onClick={() => {
                this.setState({displayEnhancer: false});
                this.props.homeHandler();
              }} link name='home' size='large'></Icon>

          </div>
          <div className="item">
            <div className="ui action left icon input">
            {/*search bar here*/}
              <form onSubmit={this.handleSearch.bind(this)}>
                <i className="search icon"></i>
                <input className="search-query"type="type" placeholder="Search"/>
                <Button color='orange' className="ui button">Submit</Button>
              </form>
            </div>
          </div>
          <Menu.Menu position="right">
              {this.renderCredential()}
          </Menu.Menu>
        </div>
        {this.state.displayEnhancer ? this.renderSearchEnhancer() : undefined}
      </div>
    )
  }

  handleSearch(e) {
    e.preventDefault();
    const query = document.getElementsByClassName('search-query')[0].value;
    this.setState({displayEnhancer: !!query});

    store.dispatch({
      type: 'SET_QUERY',
      payload: query
    })

    document.getElementsByClassName('search-query')[0].value = '';
    this.props.searchListings(query);

  }
}


export default NavBar;