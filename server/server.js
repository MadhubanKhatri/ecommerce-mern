require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const authRouters = require("./routers/userRoutes");
const productRouters = require("./routers/productRoutes");
const orderRouters = require("./routers/orderRoutes");
const paymentRouters = require("./routers/paymentRoute");
const cors = require("cors");

const app = express();

// ⚠️ WARNING: Update 'origin' to your production frontend URL when deploying, 
// otherwise your deployed frontend won't be able to talk to this backend.
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Concurrently trigger DB connection for serverless environments
connectDb().catch((err) => {
    console.error("Initial database connection error:", err);
});

app.use("/api/users", authRouters);
app.use("/api/products", productRouters);
app.use("/api/orders", orderRouters);
app.use("/api/v1", paymentRouters);

// Base health check route (Good for testing if deployment worked)
app.get("/", (req, res) => {
    res.send("Backend server is running on Vercel!");
});

// ONLY run app.listen if we are running locally. 
// Vercel handles the execution environment themselves in production.
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

// CRITICAL: Export the app instance for Vercel
module.exports = app;
