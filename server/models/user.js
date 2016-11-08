const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true }, //whenever string is saved it will be transformed to lowercase
	password: String,
	firstName: String,
	lastName: String
});

// On Save Hook, encrypt ... fnction is ran before userSchema instance is saved
userSchema.pre('save', function(next) {
	const user = this;

	//generate a salt
	bcrypt.genSalt(10, function(err, salt) {
		if(err) { return next(err); }

		// hash our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) { return next(err); }

			//overwrite the plain text password with encrypted versions
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) { return callback(err); }

		callback(null, isMatch);
	});
}

// Create model class
const ModelClass = mongoose.model('user', userSchema); //class of users

// Export the model
module.exports = ModelClass;