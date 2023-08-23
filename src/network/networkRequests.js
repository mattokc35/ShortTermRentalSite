export const initialPriceRequest = async (input) => {
    try {
      const response = await fetch("http://localhost:8000/initial-request", {
        method: "POST",
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
      console.log(data); // Log the data received from the server
  
      return data; // Return the parsed data
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
      return null; // Return null or a default value if there was an error
    }
  };

  export const calendarRequest = async () => {
    try {
      const response = await fetch("http://localhost:8000/calendar-request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // Handle non-200 status codes if needed
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data); // Log the data received from the server
  
      return data; // Return the parsed data
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
      return null; // Return null or a default value if there was an error
    }
    
  }  
  