// routes/contractRoutes.js
const express = require("express");
const contractController = require("../controllers/contractController");

const router = express.Router();

router.post("/send-contract", contractController.sendContractAndEmail);
router.post("/get-contract-status", contractController.getContractStatus);
router.post("/send-data-to-backend", contractController.sendDataToBackend);

module.exports = router;
