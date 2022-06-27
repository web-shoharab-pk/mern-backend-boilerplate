const dotenv = require("dotenv");
const app = require("./app/app");
const connectDatabase = require("./config/database");


// HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the Server due to UNCAUGHT Promise Rejection!`);
    process.exit(1)
})

// dot environment config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: './config/config.env' });
}

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// UNHANDLE PROMISE REJECTION
process.on("unhandledRejection", err => {

    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the Serve due to Unhandle Promise Rejection!`);

    server.close(() => {
        process.exit(1) 
    })
})