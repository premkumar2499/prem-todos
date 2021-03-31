const express = require("express");
const app = express();
const pino = require('pino');
const logger = pino({
    prettyPrint: true
  })
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser")
const csurf = require("csurf");

require('dotenv').config()

var corsOptions = {
    origin: "http://localhost:3000"
};

let secrets, port;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
    port = process.env.PORT;
} else {
    secrets = require("./utils/secrets");
    port = 5000;
}

// #mongoDB
// require("./utils/db");

// #Middleware
// app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());


app.use((req, res, next) => {
    res.locals.secrets = secrets;
    next();
});

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static ressources in production
app.use(express.static(__dirname + "/public"));

// // #Cookie Session
// const cookieSession = require("cookie-session");
// app.use(
//     cookieSession({
//         secret: secrets.COOKIE_SESSION_SECRET,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//         httpOnly: true,
//         secure: true,
//         // secure: false,
//     })
// );

// // #CSRF security for Production
// if (process.env.NODE_ENV == "production") {
//     app.use(csurf());
//     app.use((req, res, next) => {
//         res.set("x-frame-options", "DENY");
//         res.cookie("mytoken", req.csrfToken());
//         next();
//     });
// }

// #Routes
app.use("/api/auth", require("./utils/auth"));
app.use("/", require("./endpoints/index"));

// Serve the build in production
// app.get("*", (req, res) => res.sendFile(__dirname + "/client/public/index.html"));

app.listen(port, () => logger.info(`Server listening on port ${port}`));
