//EXPRESS SERVER CONFIGURATION
const express = require("express");
const app = express();
app.listen(process.env.PORT || 5000);

//DEPENDACIES
const bodyParser = require("body-parser");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
//PARSING MIDDLEWARE

//Parse application/x-www-form-
app.use(bodyParser.urlencoded({ extended: true }));

//Parse application/json
app.use(bodyParser.json());
//Satic files
app.use(express.static("public"));

//Templating Engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

const blogRoute = require("./routes/blog");
app.use("/blogs", blogRoute);

const eventRoute = require("./routes/events");
app.use("/events", eventRoute);

const obsRoute = require("./routes/observation");
app.use("/observations", obsRoute);

const projectRoute = require("./routes/project");
app.use("/projects", projectRoute);

const sponsershipRoute = require("./routes/sponsership");
app.use("/sponserships", sponsershipRoute);

const membershipRoute = require("./routes/membership");
app.use("/memberships", membershipRoute);