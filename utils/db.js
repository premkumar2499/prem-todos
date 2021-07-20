const mongoose = require("mongoose");
const pino = require('pino');
const logger = pino({
    prettyPrint: true
  })

let mongoDB;
if (process.env.DATABASE_URL) {
    mongoDB = process.env.DATABASE_URL;
} else {
    const { MDB_URL } = require("./secrets");
    mongoDB = MDB_URL;
}


function dbConnect(){
    return mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        connectTimeoutMS: 30000,
        useFindAndModify: false,
    })
    .then(() => logger.info("-----> mongoDB connected..."))
    .catch((err) =>
        logger.error("-----> Error trying to connect to mongoDB: ", err)
    );  
}
// mongoose.connection.on(
//     "error",
//     console.error.bind(console, "-----> mongoDB connection error")
// );

function dbClose(){
    return mongoose.connection.close(function(){
        logger.info("Mongoose default connection is disconnected due to application termination");
        //  process.exit(0);
        });
}

// mongoose.connection.on('disconnected', function(){
//     logger.info("Mongoose default connection is disconnected");
// });

// process.on('SIGINT', function(){
//     mongoose.connection.close(function(){
//       logger.info("Mongoose default connection is disconnected due to application termination");
//        process.exit(0);
//       });
// });
module.exports = {dbConnect,dbClose};