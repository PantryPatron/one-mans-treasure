const db = require('../../database/Listings');
const util = require('../services/utility.js');

module.exports = {
  listings: {
    get: function(req, res) {
      if(!req.query) {
        db.fetchListings()
        .then(listings=>{
          res.status(200).send(listings);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
      } else {
        db.fetchListings(req.query)
        .then(listings=>{
          res.status(200).send(listings);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
      }
    },
    post: function(req, res) {
      db.saveListing(req.body)
        .then(savedListing=>{
          res.status(201).send(savedListing);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
    },

    setInterest: function(req, res) {
      console.log(req.body)
      db.updateInterest(req.body)
        .then(updated=>{
          res.status(201).send(updated);
        })
        .catch(error=>{
          res.status(404).send(error);
        })
    },

    delete: function(req, res) {
      db.deleteListing(req.params.listingId)
      .then(deleted=>{
        res.status(201).send(deleted);
      })
      .catch(error=>{
        res.status(401).send(error);
      })
    },


    update: function(req, res) {
      db.updateListing(req.params.listingId, req.body)
      .then(updated=>{
        res.status(201).send(updated);
      })
      .catch(error=>{
        res.status(401).send(error);
      })
    },

    give: function(req, res) {
      util.giveListing(req.body)
      .then(given=>{
        res.status(201).send(given);
      })
      .catch(error=>{
        res.status(401).send(error);
      })
    },

    getClaimedListings: (req, res)=>{
      console.log(req.body.listingsId)
      db.fetchClaimedListing(req.body.listingsId)
        .then(claimed=>{
          console.log(claimed)
          res.status(201).send(claimed);
        })
        .catch(error=>{
          res.status(401).send(error);
        })
    },
    
    getOneListing: (req, res) => {
      db.findOneListing(req.params.listingId).then(listing => {
        res.status(200).send(listing);
      }).catch(error => {
        console.log('GET ONE LISTING ERR', error)
        res.status(400).send(error);
      })
    }


  }
}