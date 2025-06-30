const listingDb = require("../../database/Listings");
const userDb = require("../../database/Users");

module.exports = {
    createSession: function(req /*, res, newUser*/) {
        return req.session.regenerate(() => {
            return;
        });
    },

    giveListing: function(data) {
        let receiverId = data.receiver;
        let listingId = data.listing;
        return new Promise((resolve, reject) =>
            userDb
                .claimItem(receiverId, listingId)
                .then(() =>
                    listingDb
                        .markClaimed(listingId)
                        .then((dataTwo) => {
                            resolve(dataTwo);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                )
                .catch((error) => {
                    console.log("item not placed in claim array", error);
                })
        );
    },
};
