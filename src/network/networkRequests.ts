const BASE_URL = "your-backend-url-here";

const request = async (
  path: string,
  method: string,
  body?: any
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${path}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const contractRequest = async (requestData: any): Promise<any> => {
  try {
    const data = await request("create-contract", "POST", requestData);
    console.log(data);
    window.alert(
      "Booking request successful! We have sent a contract to your email you will need to sign in order to proceed to the payment page."
    );
    return data;
  } catch (error) {
    window.alert(
      "Failed to send booking request. Please try again later, or you may have not filled out all input fields."
    );
    return null;
  }
};

export const contractStatusRequest = async (requestData: any): Promise<any> => {
  try {
    const data = await request("get-contract-status", "POST", requestData);
    window.alert("Contract Status request sent.");
    return data;
  } catch (error) {
    window.alert(
      "Failed to send contract status request. Please try again later."
    );
    return null;
  }
};

export const calendarRequest = async (): Promise<any> => {
  try {
    return await request("calendar-request", "GET");
  } catch (error) {
    window.alert("Calendar request not successful");
    return null;
  }
};

export const priceRequest = async (): Promise<any> => {
  try {
    return await request("price-request", "GET");
  } catch (error) {
    console.error("Error:", error);
    return null;
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
    const data = await request("create-checkout-session", "POST", input);
    console.log(data);
    console.log(data.url);
    console.log(data.transactionId);
    return data;
  } catch (error) {
    window.alert("Failed Checkout. Please Try Again.");
    console.error("Error:", error);
    return null;
  }
};

export const sendContractEmailDataToBackend = async (
  contractEmailDataObject: any
): Promise<any> => {
  try {
    const data = await request(
      "send-data-to-backend",
      "POST",
      contractEmailDataObject
    );
    console.log("send contract email data to backend response data");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const createVerificationSession = async (
  stripe: any
): Promise<boolean> => {
  try {
    const response = await request("create-verification-session", "POST");
    // Show the verification modal.
    const { error } = await stripe.verifyIdentity(response.clientSecret);

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

export const verifyPromoCode = async (promoCode: string): Promise<any> => {
  try {
    const response = await request("/verify-promo-code", promoCode, "GET");
    console.log("Promo code verification response: ", response);
    return response;
  } catch (error) {
    console.error("Error verifying promo code:", error);
    return null;
  }
};
