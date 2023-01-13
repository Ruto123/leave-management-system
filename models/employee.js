var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var passportLocalMongoose = require("passport-local-mongoose");

var employeeSchema = new mongoose.Schema({
  name: String,
  type: String,
  username: String,
  password: String,
  
  image: String
});

employeeSchema.plugin(passportLocalMongoose);
var employee = (module.exports = mongoose.model("employee", employeeSchema));

module.exports.createemployee = function(newemployee
, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newemployee
    .password, salt, function(err, hash) {
      newemployee
    .password = hash;
      newemployee
    .save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  employee
.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  employee
.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, passwordFound) {
    if (err) throw err;
    callback(null, passwordFound);
  });
};
