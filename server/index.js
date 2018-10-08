const express = require("express");
const fs = require("fs");
const login = require("./routes/login");
const logout = require("./routes/logout");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("./utils/mongoose");
const bodyParser = require("body-parser");
const registration = require("./routes/registration");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(
  session({
    secret: "secretKey",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
/**
 * middleware для установки всем ответам заголовка
 */
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

/**
 * Обработка корневого запроса
 */
app.get("/", (req, res) => {
  if (req.session.user) {
    res.send("You are logged as " + JSON.stringify(req.session.user));
  } else {
    res.send("Login please");
  }
});

app.post("/login", login);
app.post("/logout", logout);
app.post("/registration", registration);
/**
 * Получение списка треков в директории /static/mus/
 */
app.get("/tracks", (req, res) => {
  const dir = fs.readdirSync("./static/mus/");
  const mp3 = dir.filter(isMp3);
  res.send(mp3);
});
/**
 * Получение трека по наименованию
 */
app.get("/tracks/:name", (req, res, next) => {
  const fileName = req.params.name;
  if (isMp3(fileName)) {
    var options = {
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
      }
    };
    res.sendFile(__dirname + "/static/mus/" + fileName, options, err => {
      if (err) {
        console.log("File " + fileName + " not found");
        next(err);
      } else {
        console.log("File sent:", fileName);
      }
    });
  } else {
    res.status(400).send("Bad request");
  }
});

/**
 * Обработка ошибок
 */
app.use(function(err, req, res, next) {
  if (err) {
    console.error(err);
  }
  res.status(500).send("Something broke!");
});
/**
 * Прослушивание сервером порта 3000
 */
app.listen(3000, () => {
  console.log("Server started at :3000");
});

/**
 * Проверка наличия в строке
 * @param {string} fileName
 */
const isMp3 = fileName => fileName.split(".")[1] === "mp3";
