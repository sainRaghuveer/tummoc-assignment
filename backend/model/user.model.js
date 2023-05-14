const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});



UserSchema.pre("save", async function(next) {
  //this will refer to userModel
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}


const UserModel = mongoose.model('userData', UserSchema);

module.exports = UserModel;