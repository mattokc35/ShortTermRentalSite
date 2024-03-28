const fetch = require("node-fetch");

const ESIGN_API_KEY = process.env.ESIGN_API_KEY;
const CONTRACT_TEMPLATE_ID = process.env.CONTRACT_TEMPLATE_ID;

const createContract = async (contractEmailDataObject) => {
  const templateId = CONTRACT_TEMPLATE_ID;
  const signers = [
    {
      name: contractEmailDataObject.guest,
      email: contractEmailDataObject.email,
    },
  ];

  const placeholderFields = [
    { api_key: "Guests", value: contractEmailDataObject.name },
    { api_key: "Owners", value: contractEmailDataObject.Owners },
    { api_key: "Today", value: contractEmailDataObject.today },
    { api_key: "Total_Rent", value: contractEmailDataObject.total_rent },
    { api_key: "Total_Guests", value: contractEmailDataObject.total_guests },
    { api_key: "Checkin", value: contractEmailDataObject.Checkin },
    { api_key: "Checkout", value: contractEmailDataObject.Checkout },
    { api_key: "Guest_email", value: contractEmailDataObject.Guest_email },
    { api_key: "Checkin_Time", value: contractEmailDataObject.Checkin_Time },
    { api_key: "Checkout_Time", value: contractEmailDataObject.Checkout_Time },
  ];

  try {
    const response = await fetch(
      "https://esignatures.io/api/contracts?token=" + ESIGN_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_id: templateId,
          signers,
          placeholder_fields: placeholderFields,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Contract POST request failed");
    }

    const responseData = await response.json();
    const contractID = responseData?.data?.contract?.id;

    return { ...contractEmailDataObject, contractID };
  } catch (error) {
    console.error("Error creating contract:", error.message);
    throw new Error("Error creating contract:", error.message);
  }
};

const getContractStatus = async (contractId) => {
  try {
    const response = await fetch(
      `https://esignatures.io/api/contracts/${contractId}?token=${ESIGN_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const contractData = await response.json();
      return contractData;
    } else {
      throw new Error("Failed to fetch contract status");
    }
  } catch (error) {
    console.error("Error fetching contract status:", error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createContract,
  getContractStatus,
};
