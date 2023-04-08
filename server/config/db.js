const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    (err) => {
      if (!err) {
        console.log("Mongodb Connected Sucessfully!!!");
      } else {
        console.log(
          "Mongodb Connected Sucessfully!!!" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};

module.exports = connectDB;
