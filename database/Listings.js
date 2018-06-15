const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./index.js');
const Comments = require('./Comments.js');
const User = require('./Users.js');

const User = require('./Users.js');

let listingsSchema = mongoose.Schema({
  title: String,
  location: String,
  listedBy: String,
  isAvailable: Boolean,
  interested_users: Array,
  description: String,
  photo: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
},
{
  timestamps: true
}
);

let Listing = mongoose.model('Listing', listingsSchema);

module.exports.Listing = Listing;

exports.saveListing = (listing) => {
  let newlisting = {};
  newlisting.title = listing.title;
  newlisting.location = listing.loc;
  newlisting.listedBy = listing.userId;
  newlisting.isAvailable = true;
  newlisting.interested_users = [];
  newlisting.description = listing.desc;
  newlisting.photo = listing.image;
  let listingToStore = new Listing(newlisting);
  return new Promise((resolve, reject)=>{
    listingToStore.save()
      .then(savedListing => {
        User.saveListingToUser(savedListing.listedBy, savedListing);

        return savedListing;
      })
      .then(savedListing => {
        resolve(savedListing);
      })
      .catch(error => {
        reject(error);
      });
  });
};
// used to prevent Ddos attacks
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.fetchListings = (query)=>{
  if(query.query) {
    const regex = new RegExp(escapeRegExp(query.query), 'gi');
    return new Promise((resolve, reject) => {
      Listing.find().or([{location: regex}, {title: regex}, {description: regex}])
      .limit(12)
      .exec()
      .then(listings => {
        console.log('located by zip', listings);
        resolve(listings);
      })
      .catch(error => {
        reject(error);
      })
    }) // end Promise
  } else {
    return new Promise((resolve, reject)=>{
      Listing.find({isAvailable: true})
      .sort({createdAt: -1})
      .limit(12)
      .exec()
      .then(listings=>{
        console.log(listings);
        resolve(listings);
      })
      .catch(error=>{
        reject(error);
      })
    });
  }
}

exports.markClaimed = (listing) => {
  console.log(listing, 'db listing');
  return new Promise((resolve, reject)=>{
    Listing.findByIdAndUpdate(listing, {$set: {isAvailable: false}})
      .exec().then(updated => {
        resolve(updated);
      })
      .catch(error => {
        error;
      });
  });
};

exports.deleteListing = (id)=>{
  return new Promise((resolve, reject)=>{
    Listing.findByIdAndRemove(id)
      .then(deleted=>{
        resolve(deleted);
      })
      .catch(error=>{
        reject(error);
      });
  });
};

exports.updateInterest = ({id, userId, claimed})=>{
  console.log('🙀 updating interests at: ', Date(), 'id:', id, 'userid:', userId, 'claimed:', claimed)
  // return new Promise((resolve, reject)=>{
    if(JSON.parse(claimed) === true){
      //promise.all - 2 async calls
        return Listing.findByIdAndUpdate(id, {$pull:{interested_users:{$in: userId}}})
        .exec()
        // .then(User.updateUserKarma({id, userId, claimed}))//.then(updated=>{
        //   resolve(updated);
        // })
        // .catch(error=>{
        //   error;
        // })

        // User.findByIdAndUpdate(userId, { $inc: { 'karma': -1 }}).exec()
      } else {
        return Listing.findByIdAndUpdate(id, {$push:{interested_users: userId}})
        .exec()
        // .then(User.updateUserKarma({id, userId, claimed}))//.then(updated=>{
        //   resolve(updated);
        // })
        // .catch(error=>{
        //   error;
        // })
      }
  // })
}

exports.updateListing = (id, {title, desc, image, loc}) => {
  return new Promise((resolve, reject) => {
    Listing.findByIdAndUpdate(id, { $set: { 'title': title, 'description': desc, 'photo': image, 'location': loc } }, { new: true })
      .then(updated=>{
        resolve(updated);
      }).catch(err=>{
        reject(err);
      });
  });
};

exports.fetchClaimedListing = (listings)=>{
  return new Promise((resolve, reject)=>{
    Listing.find({_id: {$in: listings}})
      .then(claimedListings=>{
        resolve(claimedListings);
      })
      .catch(error=>{
        reject(error);
      });
  });
};