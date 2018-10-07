var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/musapp");

module.exports = mongoose;
