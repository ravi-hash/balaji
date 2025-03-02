// paymentServer.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
require("dotenv").config(); // Load environment variables

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use your secret key from Stripe

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route to make sure the server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Payment Server");
});

// Payment Route to handle the transaction
app.post("/checkout", async (req, res) => {
  const { amount, token } = req.body;

  try {
    // Create a charge with Stripe
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100), // Amount in cents (Stripe uses the smallest unit of currency)
      currency: "inr", // You can change it to the currency you're using
      source: token.id, // Stripe token obtained from frontend
      description: `Payment for order`,
    });

    if (charge.status === "succeeded") {
      res.status(200).json({ success: true, message: "Payment successful" });
    } else {
      res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
