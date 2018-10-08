module.exports = (req, res) => {
  if (req.session.user) {
    console.log("logging out");
    req.session.destroy(err => {
      if (err) console.log(err);
    });
    res.send("logged out");
  } else {
    console.log("not logged");
    res.send("not logged");
  }
};
