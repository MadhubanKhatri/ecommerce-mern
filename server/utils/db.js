const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(URI);
        console.log("MongoDB Connected:", conn.connection.host);
    }catch(err){
        console.log(err);
        process.exit(1);

    }
};

module.exports = connectDb;