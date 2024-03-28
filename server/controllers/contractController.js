const contractModel = require("../models/contractModel");
const sendEmail = require("./emailController");

const sendContractAndEmail = async (contractEmailDataObject) => {
  try {
    const contractEmailDataObjectWithContractID =
      await contractModel.createContract(contractEmailDataObject);
    await sendEmail(contractEmailDataObjectWithContractID);
  } catch (error) {
    console.error("Error sending contract and email:", error.message);
    throw new Error("Error sending contract and email:", error.message);
  }
};

const getContractStatus = async (req, res) => {
  const contractId = req.body.id;

  try {
    const contractData = await contractModel.getContractStatus(contractId);
    res.status(200).json(contractData);
  } catch (error) {
    console.error("Error fetching contract status:", error);
    res.status(500).json({ error: error.message });
  }
};

const sendDataToBackend = async (req, res) => {
  try {
    const contractData = req.body;
    console.log("Received data from frontend:");
    console.log(contractData);
    res.status(200).send("Data received successfully by the backend");
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  sendContractAndEmail,
  getContractStatus,
  sendDataToBackend,
};
