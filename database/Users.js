const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const db = require('./index.js');

let usersSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true} },
  password: {type: String, required: true},
  created_at: Date,
  my_listings: Array, //{type: Schema.Types.ObjectId, ref: 'Listing'}
  // my_listings: [{type: Schema.Types.ObjectId, ref: 'Listing'}],
  // gifted: Number, for any information regarding 'gifted listings' we can just going into the my_listings array and filter there.
  claimed: Array,
  karma: { type: Number, default: 3 },
  tokenCount: Number,
  isAdmin: Boolean
})

let User = mongoose.model('User', usersSchema);

module.exports.User = User;

exports.saveUser = (userData) => {
  let newUser = {};
  let parsedUser = userData.body;
  let plainTextPw = parsedUser.pw;

  let hash = bcrypt.hashSync(plainTextPw, 10);

  newUser.username = parsedUser.user;
  newUser.password = hash;
  newUser.created_at = parsedUser.created_at;
  newUser.my_listings = [];
  newUser.claimed = [];
  newUser.tokenCount = 0;
  newUser.isAdmin = false;
  let user = new User(newUser);
  return new Promise((resolve, reject)=>{
    user.save()
    .then((savedUser) => {
      resolve(savedUser);
    })
    .catch(error=>{
      reject(error);
    })
  })

};

exports.loginUser = (userData, callback) => {
  let user = userData.body.user;
  let password = userData.body.pw;
  User.findOne({username: user}, function(err, user) {
    if(err) {
      console.error(err);
    }
  }).then(user => {
    callback(bcrypt.compareSync(password, user.password), user);
  }).catch(err => callback(false));
};

exports.updateUser = (id, username, password, originalPw) => {
  if (password === originalPw) {
    return new Promise((resolve, reject)=> {
      User.findByIdAndUpdate(id, { $set: { 'username': username } }, { new: true })
      .exec().then(updatedInfo=> {
        console.log('Updated Info: ', updatedInfo);
        resolve(updatedInfo);
      }).catch(err=> {
        reject(err);
      })
    })
  } else {
    let plainTextPw = password;
    let hash = bcrypt.hashSync(plainTextPw, 10);
    return new Promise((resolve, reject)=> {
      User.findByIdAndUpdate(id, { $set: { 'password': hash, 'username': username } }, { new: true })
      .exec().then(updatedInfo=> {
        console.log('Updated Info: ', updatedInfo);
        resolve(updatedInfo);
      }).catch(err=> {
        reject(err);
      })
    })
  }
};

exports.updateUserKarma = ({userId, claimed})=>{
  console.log('💹 updateUserKarma at: ', Date(), 'userid:', userId, 'claimed:', claimed)
    if(claimed){
      return User.findByIdAndUpdate(userId, { $inc: { 'karma': +1 }}).exec()
    } else {
      return User.findByIdAndUpdate(userId, { $inc: { 'karma': -1 }}).exec()
    }
}

exports.claimItem = (user, listing) => {
  return new Promise((resolve, reject)=>{
    User.findByIdAndUpdate(user, {$push: {claimed: listing}})
    .exec().then(updated => {
      resolve(updated);
    })
    .catch(error => {
      error;
    })
  })
}

exports.fetchInterestedUsers = (users)=>{
  return new Promise((resolve, reject)=>{
    User.find({_id: {$in: users}})
    .then(interestedUsers=>{
      resolve(interestedUsers)
    })
    .catch(error=>{
      reject(error)
    })
  })
}