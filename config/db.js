const { default: mongoose } = require("mongoose");
const env = require("dotenv").config();

const db = {
  connect: async () => {
    try {
      await mongoose.connect("mongodb+srv://ilham:49K2j3k5RnhZ2zi9@mycluster.zleqwyu.mongodb.net/");
      console.log("Mongoose Connected!!");
    } catch (err) {
      console.log("Mongose connected error", err);
    }
  },
};

module.exports = db;
