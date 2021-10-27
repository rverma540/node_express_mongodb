const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/planning-service", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connecion is succseful");
  })
  .catch((e) => {
    console.log("No connection");
  });
