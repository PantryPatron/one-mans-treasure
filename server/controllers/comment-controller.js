const db = require('../../database/Comments');
const util = require('../services/utility.js');

module.exports = {
  comments: {
    post: function(req, res) {
      console.log('This is the request body: ', req.body)
      db.saveComment(req.body).then(savedComment => {
        console.log('Saved comment: ', savedComment)
        res.status(201).send(savedComment);
      }).catch(error => {
        console.log('error: ', error)
        res.status(404).send(error);
      });
    },
    get: function(req, res) {
      db.findCommentsList().then(commentsList => {
        console.log('This is my comments list: ', commentsList)
        res.status(201).send(commentsList)
      }).catch(error => {
        console.log('error in getting comments list: ', error)
        res.status(404).send(error)
      });
    }
  }
};