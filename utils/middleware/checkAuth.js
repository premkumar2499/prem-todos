const pino = require('pino');
const logger = pino({
    prettyPrint: true
  })
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // const token = req.session.token;
    const tokenData = req.header("Authorization").split(" ");
    const token = tokenData[1];
    logger.info("from auth:",token);
    jwt.verify(token, res.locals.secrets.JWT_SECRET, (err, user) => {
        logger.info("from auth:",user);
        if (err || user.userStatus != "active") {
            res.json({
                msg : "Your account is not verified"
            });
        } else {
            req.userId = user.userId;
            // req.userRole = user.userRole;
            req.userStatus = user.userStatus;

            next();
        }
    });
};

module.exports = authenticateToken;
