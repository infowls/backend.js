var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
	'email' : String,
	'password' : String,
	'cities': Array
});

userSchema.statics.authenticate = function (email, password, callback) {
	this.findOne({ email: email }).exec(function (err, user) {
		if (err) {
			console.error(err);
			return callback(err);
		} else if (!user) {
			console.log('User not found.');
			var err = new Error('User not found.');
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				console.log("Passwords match");
				return callback(null, user);
			} else {
				console.log("Passwords dont match");
				var err = new Error('Paswords do not match');
				err.status = 406;
				return callback(err);

			}
		})
	});
}

userSchema.pre('save', function (next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, 10, function (err, hash) {
	  if (err) {
		return next(err);
	  }
	  user.password = hash;
	  next();
	})
});

module.exports = mongoose.model('user', userSchema);
