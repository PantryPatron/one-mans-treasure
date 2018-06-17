import React from 'react';
import { Button, Header, Icon, Modal, Input, Form, Message } from 'semantic-ui-react'
import $ from 'jquery';

class Signup extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      account: {
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmedPw: ''
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
    const account = this.state.account;
    account[key] = event.target.value;
    this.setState({account: account});
  }

  submit(){
    if(this.state.account.password !== this.state.account.confirmedPw){
      $('.register-password-error-match').show();
    } else if(this.state.account.username.length < 4){
      $('.register-username-error').show();
    } else if(this.state.account.password.length <8){
       $('.register-password-error-length').show();
    } else {
      this.props.create(this.state.account);
      this.close();
    }
  }

  render(){
    return (
      <Modal className="signup-modal" open={this.state.isOpen}
      trigger={<Button color='orange' onClick={this.open.bind(this)}>Signup</Button>} basic size='tiny'>
        <Header icon='archive' content='Create An Account' />
        <Modal.Content>
          <Form>
            <Form.Group unstackable widths={3}>
              <div className="register-username-error" hidden>
                <div className="ui right pointing red basic label"> Username must be 4 characters long</div>
              </div>
              <Form.Input onChange={this.handleChange.bind(this, 'username')}
              value={this.state.account.username} placeholder='Username' required/>
              <Form.Input onChange={this.handleChange.bind(this, 'firstname')}
              value={this.state.account.firstname} placeholder='First name'/>
              <Form.Input onChange={this.handleChange.bind(this, 'lastname')}
              value={this.state.account.lastname} placeholder='Last name'/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input type='password' onChange={this.handleChange.bind(this, 'password')}
              value={this.state.account.password} placeholder='Password' required/>
              <Form.Input type='password' onChange={this.handleChange.bind(this, 'confirmedPw')}
              value={this.state.account.confirmedPw} placeholder='Confirm Password' required/>
              <div className="register-password-error-match" hidden>
                <div className="ui left pointing red basic label error">Passwords do not match</div>
              </div>
              <div className="register-password-error-length" hidden>
                <div className="ui left pointing red basic label error">Password must be 8 characters long</div>
              </div>
            </Form.Group>
            {/* <Form.Checkbox className='agreement' label='I agree to the Terms and Conditions' /> */}
              <Button type="button" onClick={this.close.bind(this)} basic color='red' inverted>
                <Icon name='remove'/>Cancel
              </Button>
              <Button type="button" onClick={this.submit.bind(this)} color='blue' inverted type='submit'>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
export default Signup
