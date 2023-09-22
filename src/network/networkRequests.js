export const initialPriceRequest = async (input) => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/initial-request",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
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

export const calendarRequest = async () => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/calendar-request",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      },
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

export const priceRequest = async () => {
  try {
    const response = await fetch(
      "https://shorttermrentalsite-backend.onrender.com/price-request",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      },
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
