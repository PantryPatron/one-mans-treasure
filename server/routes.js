const listingCtrl = require('./controllers/listing-controller');
const userCtrl = require('./controllers/user-controller');
const commentCtrl = require('./controllers/comment-controller');
const router = require('express').Router();

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.comparePassword);
router.put('/account/:userId', userCtrl.updateUserInfo);
router.put('/interestedUsers', userCtrl.getInterestedUsers);
router.post('/listing', listingCtrl.listings.post);
router.get('/listing', listingCtrl.listings.get);
router.delete('/listing/:listingId', listingCtrl.listings.delete);
router.put('/listing/:listingId', listingCtrl.listings.update);
router.post('/listing/give', listingCtrl.listings.give);
router.put('/interest', listingCtrl.listings.setInterest);
router.post('/listing/claimed', listingCtrl.listings.getClaimedListings);
router.post('/api/comments', commentCtrl.comments.post);
router.get('/fetch/:listingId', listingCtrl.listings.getOneListing);
router.post('/user', userCtrl.updateKarma);


module.exports = router;