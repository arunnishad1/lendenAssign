require("dotenv").config();
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs");
const { Server } = require("socket.io");
const router = require("../router/auth.router.js");
const db = require("../config/dbconn.js");
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

const io = new Server(server);
let arr = [];
let playerArray = [];

io.on("connection", (socket) => {
  socket.on("find", (e) => {
    if (e.name != null) {
      arr.push(e.name);

      if (arr.length >= 2) {
        let p1 = {
          p1Name: arr[0],
          p1Value: "X",
          p1Move: "",
        };
        let p2 = {
          p2Name: arr[1],
          p2Value: "O",
          p2Move: "",
        };

        let obj = {
          p1: p1,
          p2: p2,
          sum: 1,
        };
        playerArray.push(obj);
        arr.splice(0, 2);
        io.emit("find", { playerArray: playerArray });
      }
    }
  });

  socket.on("playing", (e) => {
    if (e.value == "X") {
      const objToChange = playerArray.find((elem) =>
        elem.p1.p1Name.toLowerCase()
      );
      objToChange.p1.p1Move = e.id;
      objToChange.sum += 1;
    } else if (e.value == "O") {
      const objToChange = playerArray.find((elem) =>
        elem.p2.p2Name.toLowerCase()
      );
      objToChange.p2.p2Move = e.id;
      objToChange.sum += 1;
    }

    io.emit("playing", { playerArray: playerArray });
  });

  socket.on("gameOver", (e) => {
    playerArray = playerArray.filter((obj) => obj.p1.p1Name !== e.name);
  });
});

app.use("/", router);
server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
