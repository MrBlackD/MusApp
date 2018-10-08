const User = require("../models/user");

module.exports = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user) {
        if (user.password == password) {
          req.session.user = user;
          res.send("logged");
        }
      }
      res.send("Bad username or password");
    })
    .catch(err => {
      console.log("error", err);
      res.send("error");
    });
};
