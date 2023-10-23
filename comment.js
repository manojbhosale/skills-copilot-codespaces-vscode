// create web server with express
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
// import data
const comments = require("./data/comments");
const contacts = require("./data/contacts");
const products = require("./data/products");
// import routes
const commentsRoutes = require("./routes/comments");
const contactsRoutes = require("./routes/contacts");
const productsRoutes = require("./routes/products");
// use routes
app.use("/comments", commentsRoutes);
app.use("/contacts", contactsRoutes);
app.use("/products", productsRoutes);
// serve static files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/css", express.static(path.join(__dirname, "css")));
// create server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});