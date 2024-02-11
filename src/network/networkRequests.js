export const initialPriceRequest = async (input) => {
  try {
    const response = await fetch("<your-backend-server>/initial-request", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      // Handle non-200 status codes if needed
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("price request successful");
    return data; // Return the parsed data
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
    return null; // Return null or a default value if there was an error
  }
};

export const contractRequest = async (requestData) => {
  try {
    const response = await fetch("<your-backend-server>/create-contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      window.alert(
        "Booking request successful! We have sent a contract to your email you will need to sign in order to proceed to the payment page."
      );
      return data;
    } else {
      throw new Error(
        "Failed to send booking request. Please try again later, or you may have not filled out all input fields."
      );
    }
  } catch (error) {
    console.error(error);
    window.alert(error.message);
    return null;
  }
};

export const contractStatusRequest = async (requestData) => {
  try {
    const response = await fetch("<your-backend-server>/get-contract-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      window.alert("Contract Status request sent.");
      return data;
    } else {
      throw new Error(
        "Failed to send contract status request. Please try again later."
      );
    }
  } catch (error) {
    console.error(error);
    window.alert(error.message);
    return null;
  }
};

export const calendarRequest = async () => {
  try {
    const response = await fetch("<your-backend-server>/calendar-request", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      window.alert("calendar request not successful");
      // Handle non-200 status codes if needed
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("calendar request successful");
    return data; // Return the parsed data
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
    return null; // Return null or a default value if there was an error
  }
};

export const priceRequest = async () => {
  try {
    const response = await fetch("<your-backend-server>/price-request", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle non-200 status codes if needed
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
    return null; // Return null or a default value if there was an error
  }
};

export const createCheckoutSession = async (productName, priceAmount) => {
  const input = {
    productName: productName,
    priceAmount: priceAmount,
  };
  try {
    const response = await fetch(
      "<your-backend-server>/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (response.ok) {
      debugger;
      const data = await response.json();
      return data;
    } else {
      window.alert("Failed Checkout. Please Try Again.");
      throw new Error("Failed to create checkout session");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const sendContractEmailDataToBackend = async (
  contractEmailDataObject
) => {
  try {
    const response = await fetch("<your-backend-server>/sendDataToBackend", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contractEmailDataObject),
    });
    if (!response.ok) {
      // Handle non-200 status codes if needed
      throw new Error("send data to backend request was not ok");
    }

    const data = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    console.log("failed data send 2");
    console.error("Error:", error);
    return null;
  }
};

export const createVerificationSession = async (stripe) => {
  try {
    const response = await fetch(
      "<your-backend-server>/create-verification-session",
      {
        method: "POST",
      }
    );
    const session = await response.json();

    // Show the verification modal.
    const { error } = await stripe.verifyIdentity(session.clientSecret);

    if (error) {
      console.log("[error]", error);
      window.alert("ID verification not completed. Please try again.");
      return false;
    } else {
      window.alert("Verification submitted! You can now proceed to payment");
      return true;
    }
  } catch (error) {
    console.error("Error creating verification session:", error);
  }
};
