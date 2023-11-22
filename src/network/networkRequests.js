export const initialPriceRequest = async (input) => {
  try {
    const response = await fetch("<your-backend-here>/initial-request", {
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

    return data; // Return the parsed data
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
    return null; // Return null or a default value if there was an error
  }
};

export const contractRequest = async (requestData) => {
  try {
    const response = await fetch("<your-backend-here>/create-contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

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
  } catch (error) {
    console.error(error);
    window.alert(error.message);
    return null;
  }
};

export const contractStatusRequest = async (requestData) => {
  try {
    const response = await fetch("<your-backend-here>/get-contract-status", {
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
    const response = await fetch("<your-backend-here>/calendar-request", {
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

export const priceRequest = async () => {
  try {
    const response = await fetch("<your-backend-here>/price-request", {
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
