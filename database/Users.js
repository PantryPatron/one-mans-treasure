const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

let usersSchema = new Schema(
    {
        username: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        created_at: { type: Date },
        my_listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
        // giftedf: Number, for any information regarding 'gifted listings' we can just going into the my_listings array and filter there.
        claimed: { type: [Schema.Types.Mixed], default: [] },
        karma: { type: Number, default: 3 },
        tokenCount: { type: Number, default: 0 },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

let User = model("User", usersSchema);

module.exports.User = User;

exports.createUser = (userData) => {
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
    newUser.karma = 3;

    console.log("newUser: ", newUser);
    console.log("parsedUser: ", parsedUser);
    let user = new User(newUser);
    return new Promise((resolve, reject) => {
        user.save()
            .then((savedUser) => {
                resolve(savedUser);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.loginUser = (userData, callback) => {
    let user = userData.body.user;
    let password = userData.body.pw;
    User.findOne({ username: user })
        .populate("my_listings")
        .then((user) => {
            if (!user) {
                callback(false, null);
            } else {
                callback(bcrypt.compareSync(password, user.password), user);
            }
        })
        .catch((err) => callback(false, null));
};

exports.updateUser = (id, username, password, originalPw) => {
    if (password === originalPw) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(
                id,
                { $set: { username: username } },
                { new: true }
            )
                .exec()
                .then((updatedInfo) => {
                    console.log("Updated Info: ", updatedInfo);
                    resolve(updatedInfo);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    } else {
        let plainTextPw = password;
        let hash = bcrypt.hashSync(plainTextPw, 10);
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(
                id,
                { $set: { password: hash, username: username } },
                { new: true }
            )
                .exec()
                .then((updatedInfo) => {
                    console.log("Updated Info: ", updatedInfo);
                    resolve(updatedInfo);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};

exports.updateUserKarma = ({ userId, claimed }) => {
    console.log(
        "💹 updateUserKarma at: ",
        Date(),
        "userid:",
        userId,
        "claimed:",
        claimed
    );
    if (claimed) {
        return User.findByIdAndUpdate(userId, { $inc: { karma: -1 } }).exec();
    } else {
        return User.findByIdAndUpdate(userId, { $inc: { karma: +1 } }).exec();
    }
};

exports.decUserKarma = ({ userId, claimed }) => {
    return User.findByIdAndUpdate(userId, { $inc: { karma: -1 } }).exec();
};

exports.incUserKarma = ({ userId, claimed }) => {
    return User.findByIdAndUpdate(userId, { $inc: { karma: +1 } }).exec();
};

exports.claimItem = (user, listing) => {
    return new Promise((resolve) => {
        User.findByIdAndUpdate(user, { $push: { claimed: listing } })
            .exec()
            .then((updated) => {
                resolve(updated);
            })
            .catch((error) => {
                error;
            });
    });
};

exports.fetchInterestedUsers = (users) => {
    return new Promise((resolve, reject) => {
        User.find({ _id: { $in: users } })
            .then((interestedUsers) => {
                resolve(interestedUsers);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.saveListingToUser = (userId, listing) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(
            userId,
            { $push: { my_listings: listing._id } },
            { new: true }
        )
            .exec()
            .then((updatedInfo) => {
                console.log("Updated Info: ", updatedInfo);
                updatedInfo.karma++;
                updatedInfo.save((err) => {
                    if (err) {
                        console.error(err);
                    }
                    resolve(updatedInfo);
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};
