export const contractRequest = async (requestData: any): Promise<any> => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/create-contract",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      window.alert(
        "Booking request successful! We have sent a contract to your email you will need to sign in order to proceed to the payment page."
      );
      return data;
    } else {
      throw new Error(
        "Failed to send booking request. Please try again later, or you may have not filled out all input fields."
      );
    }
  } catch (error: any) {
    console.error(error);
    window.alert(error.message);
    return null;
  }
};

export const contractStatusRequest = async (requestData: any): Promise<any> => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/get-contract-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      window.alert("Contract Status request sent.");
      return data;
    } else {
      throw new Error(
        "Failed to send contract status request. Please try again later."
      );
    }
  } catch (error: any) {
    console.error(error);
    window.alert(error.message);
    return null;
  }
};

export const calendarRequest = async (): Promise<any> => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/calendar-request",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      window.alert("calendar request not successful");
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

export const priceRequest = async (): Promise<any> => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/price-request",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

export const createCheckoutSession = async (
  productName: string,
  priceAmount: number
): Promise<any> => {
  const input = {
    productName: productName,
    priceAmount: priceAmount,
  };
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (response.ok) {
      console.log("checkout 150");
      const data = await response.json();
      console.log(data);
      console.log(data.url);
      console.log(data.transactionId);
      return data;
    } else {
      console.log("failed checkout");
      window.alert("Failed Checkout. Please Try Again.");
      throw new Error("Failed to create checkout session");
    }
  } catch (error) {
    console.log("failed checkout 2");
    console.error("Error:", error);
    return null;
  }
};

export const sendContractEmailDataToBackend = async (
  contractEmailDataObject: any
): Promise<any> => {
  try {
    console.log(contractEmailDataObject);
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/sendDataToBackend",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractEmailDataObject),
      }
    );
    if (!response.ok) {
      // Handle non-200 status codes if needed
      throw new Error("send data to backend request was not ok");
    }

    const data = await response.json();
    console.log("send contract email data to backend response data");
    console.log(data);

    return data; // Return the parsed data
  } catch (error) {
    console.log("failed data send 2");
    console.error("Error:", error);
    return null;
  }
};

export const createVerificationSession = async (
  stripe: any
): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/create-verification-session",
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
      console.log("Verification submitted!");
      window.alert("Verification submitted! You can now proceed to payment");
      return true;
    }
  } catch (error) {
    console.error("Error creating verification session:", error);
    return false;
  }
};
