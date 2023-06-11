const { default: mongoose } = require("mongoose");
const env = require("dotenv").config();

const db = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Mongoose Connected!!");
    } catch (err) {
      console.log("Mongose connected error", err);
    }
  },
};

module.exports = db;
