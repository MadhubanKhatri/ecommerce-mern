require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const authRouters = require("./routers/userRoutes");
const productRouters = require("./routers/productRoutes");
const orderRouters = require("./routers/orderRoutes");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5174',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}


app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/users", authRouters);
app.use("/api/products", productRouters);
app.use("/api/orders", orderRouters);


const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is listening on ${PORT}`);
    })
})