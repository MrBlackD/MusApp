const User = require("../models/user");
module.exports = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user) {
        res.send("User already exists");
      } else {
        const user = new User({ username, password });
        user.save(err => {
          if (err) return next(err);
          res.send("Success");
        });
      }
    })
    .catch(err => {
      next(err);
    });
};
