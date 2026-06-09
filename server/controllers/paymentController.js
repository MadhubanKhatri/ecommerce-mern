const instance = require("../utils/razorpayIntegration");
const crypto = require("crypto");

const paymentHandller = async (req, res)=>{
    const {amount} = req.body;
    
    
    const options = {
        amount: amount * 100,
        currency: "INR"
    }
    
    const order = await instance.orders.create(options);

    res.status(200).json({
        status: true,
        order
    })
}

const getRazorpayKey = async (req,res)=>{
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
    
}

const paymentVerification = async (req, res)=>{
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                .update(body.toString()).digest("hex")

    const isAuthentic = razorpay_signature === expectedSign;
    if(isAuthentic){
        res.status(200).json({
            status: true,
            payment_id: razorpay_payment_id
        })
    }else{
        res.success(404).json({
            success: false,
            message: "Payment failed"
        })

    }
    res.status(200).json({
        success: true
    })
}

module.exports = {paymentHandller, getRazorpayKey, paymentVerification}