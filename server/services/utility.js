const listingDb = require("../../database/Listings");
const userDb = require("../../database/Users");
const { updateKarma } = require("../controllers/user-controller");

module.exports = {
    createSession: function(req, res, newUser) {
        return req.session.regenerate((err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: "Session regeneration failed" });
            }
            req.session.user = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                karma: newUser.karma,
                my_listings: newUser.my_listings,
                claimed: newUser.claimed,
                tokenCount: newUser.tokenCount,
                isAdmin: newUser.isAdmin,
                // add other relevant user information as needed
            };
            return res.status(200).json({
                message: "User session created",
                user: req.session.user,
            });
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
