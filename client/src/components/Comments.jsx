import axios from 'axios';
import moment from 'moment';
import React from 'react';
import {Segment, TextArea} from 'semantic-ui-react';

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
    .then(_response => {
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

    }).then(_response => {
      this.props.fetchOneListing(this.props.listingId)
    }).catch(error => {
      console.error(error.response)
    })
  }

  render() {
    return (
      <div className="ui four column grid">
        <div className="one column row">
          <div className="column">
            <Segment style={{overflowX: 'hidden', width: '10 vmin', height: '15vmax'}}>
              <div className="ui comments">
                <div className="ui main text container">
                  <h3 className="ui dividing header">Comments</h3>
                  { this.props.commentData.map((commentInfo, idx) => {
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
        <div className="one column row">
          <div className="column">
            <div className="ui comments">
              <form>
                  <TextArea rows={2} placeholder='Add a comment...' style={{ width: '100%' }}
                    onChange={this.changeText.bind(this)}>
                  </TextArea>
                  <br />
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
