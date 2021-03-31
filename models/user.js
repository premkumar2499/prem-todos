var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending",
  },
  todos:{
    type:Array,
    default:[]
  },
  dateCreated:{
    type: Date,
    default: Date.now(),
  }
});

//const User = module.exports = mongoose.model('User', UserSchema);
module.exports.User = mongoose.model("user", UserSchema);