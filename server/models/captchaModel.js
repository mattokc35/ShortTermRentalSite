const fetch = require("node-fetch");

const verifyCaptcha = async (captchaValue, captchaSecret) => {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captchaValue}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to verify CAPTCHA");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  verifyCaptcha,
};
