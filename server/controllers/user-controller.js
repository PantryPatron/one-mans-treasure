const db = require("../../database/Users");
const util = require("../services/utility.js");

module.exports = {
    signUp: function(req, res) {
        db.createUser(req)
            .then((savedData) => {
                let newSession = util.createSession(req, res, savedData);
                newSession.user = savedData;
                res.status(201).send(newSession);
            })
            .catch((error) => {
                res.status(404).send(error);
            });
    },
    comparePassword: function(req, res) {
        db.loginUser(req, function(isMatch, newUser) {
            if (isMatch) {
                let newSession = util.createSession(req, res, newUser);
                newSession.user = newUser;
                res.status(200).send(newSession);
            } else {
                res.status(200).send(false);
            }
        });
    },

    updateUserInfo: function(req, res) {
        db.updateUser(
            req.params.userId,
            req.body.user,
            req.body.pw,
            req.body.originalPw
        )
            .then((updatedInfo) => {
                res.status(200).send(updatedInfo);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    },

    updateKarma: (req, res) => {
        db.updateUserKarma(req.body)
            .then((updated) => {
                res.status(201).send(updated);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    },

    getInterestedUsers: (req, res) => {
        db.fetchInterestedUsers(req.body.users)
            .then((users) => {
                res.status(201).send(users);
            })
            .catch((error) => {
                res.status(401).send(error);
            });
    },
};
