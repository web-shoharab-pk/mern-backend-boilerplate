const mongoose = require("mongoose");

const connectDatabase = () => {

    mongoose.connect(`${process.env.MONGO_URL_DEV}`, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log('mongodb connect with database. host: ', data.connection.host)
    })
       
}

module.exports = connectDatabase;