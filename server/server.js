require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const authRouters = require("./routers/userRoutes");
const productRouters = require("./routers/productRoutes");
const orderRouters = require("./routers/orderRoutes");

const app = express();

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