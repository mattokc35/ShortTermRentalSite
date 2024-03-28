const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Import routes
const calendarRoutes = require("./routes/calendarRoutes");
const captchaRoutes = require("./routes/captchaRoutes");
const contractRoutes = require("./routes/contractRoutes");
const priceRoutes = require("./routes/priceRoutes");
const promoCodeRoutes = require("./routes/promoCodeRoutes");
const stripeRoutes = require("./routes/stripeRoutes");

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

const corsOptions = {
  origin: [
    // Your origins here
  ], // Replace with your allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent with the request
  optionsSuccessStatus: 204, // No content response for preflight requests
};

app.use(cors(corsOptions));
app.use(express.json());

// Mount routes
app.use("/", calendarRoutes);
app.use("/", captchaRoutes);
app.use("/", contractRoutes);
app.use("/", priceRoutes);
app.use("/", promoCodeRoutes);
app.use("/", stripeRoutes);

const YOUR_DOMAIN = "your-domain-here";

const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
