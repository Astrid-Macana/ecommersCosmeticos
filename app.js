const express = require("express");
const app = express();
const path = require("path");


const routerProducto = require('./router/productoRouter')
const rutasMain = require("./router/main");

const bodyParser = require('body-parser');
const methodOverride = require("method-override");

app.use (express.static('public'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.listen(3000, () => console.log("Server corriendo en 3000"));

app.use("/", rutasMain);
app.use("/productos", routerProducto);

app.get("/", (req, res) => {
  res.render(__dirname + "/views/home.ejs");
});