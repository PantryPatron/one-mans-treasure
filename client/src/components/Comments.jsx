import React from 'react';
import {Container, Grid, Image, Button, TextArea, Input, Header, Icon, Segment, Divider} from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

class Comments extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      text: '',
      userId: this.props.userId,
      username: this.props.user
    }
  }

  componentDidMount(){
    axios.get(`/fetch/${this.props.listingId}`)
    .then(response => {
      this.props.fetchOneListing(this.props.listingId);
    }).catch(err => {
      console.error(err);
    })
  }

  changeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleCommentSubmit() {
    // send message to server
    axios.post('/api/comments',
    {
      text: this.state.text,
      userId: this.state.userId,
      username: this.state.username,
      postDate: this.state.date,
      listingId: this.props.listingId

    }).then(response => {
      console.log('results: ', response)
      console.log('Comment sent from client to server!')
      this.props.fetchOneListing(this.props.listingId)
    }).catch(error => {
      console.error(error.response)
    })
  }

  render() {
    return (
      <div className="ui four column grid">

        <div className="two column row">
          <div className="column">
            <Segment style={{overflow: 'auto', width: '450px', height: '150px'}}>
              <div className="ui comments">
                <div className="ui main text container">
                  <h3 className="ui dividing header">Comments</h3>
                  { this.props.commentData.map((commentInfo, idx) => {
                    console.log('this is comment data ', commentInfo)
                    return (
                      <div className="comment" key={idx}>
                        <div className="content">
                          <a className="author">{ commentInfo.username }</a>
                          <div className="metadata">
                            <span className="date">{ moment(commentInfo.posted).fromNow() }</span>
                          </div>
                          <div className="text">
                            { commentInfo.message }
                          </div>
                        </div>
                      </div>
                    )
                  }) }
                  </div>
                  
              </div>
            </Segment>
          </div>
        </div>


        <div className="two column row">
          <div className="column">
            <div className="ui comments">
              <form className="ui reply form">
                <div className="field" style={{width: '450px', height: '150px'}}>
                  <textarea 
                    onChange={this.changeText.bind(this)}>
                  </textarea>
                </div>
                <div 
                  className="ui blue labeled submit icon button" 
                  onClick={this.handleCommentSubmit.bind(this)}>
                  <i className="icon edit"></i> 
                  Add Reply
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Comments;