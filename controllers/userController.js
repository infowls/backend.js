var UserModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
    
    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
			email : req.body.email,
			password : req.body.password,
            cities: []
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * userController.logIn()
     */
    logIn: function (req, res) {
        UserModel.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error) {
                return res.status(404).json(error);
            } if (!user) {
                return res.status(404).json({
                    message: 'User not found. Wrong password or email'
                });
            } else {
                return res.status(200).json(user);
            }
        })
    },
    
    /**
     * userController.logOut()
     */
    logOut: function (req, res) {
        return res.status(201).json({ message: "Logged out" });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.email = req.body.email ? req.body.email : user.email;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.status(201).json(user);
            });
        });
    },

    /**
     * userController.addCity()
     */
    addCity: function (req, res) {
        var id = req.params.id;

        if(!req.body.city)
            return res.status(406).json({
                message: 'City not given.',
                error: err
            });

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            if(!user.cities.includes(req.body.city)){
                user.cities.push(req.body.city);
            }
            
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.status(201).json(user);
            });
        });
    },

    /**
     * userController.removeCity()
     */
    removeCity: function (req, res) {
        var id = req.params.id;

        if(!req.body.city)
            return res.status(406).json({
                message: 'City not given.',
                error: err
            });

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            if(user.cities.includes(req.body.city)){
                user.cities.splice(user.cities.indexOf(req.body.city), 1);
            }
            
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.status(201).json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
