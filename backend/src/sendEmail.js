// backend/src/utils/sendEmail.js
const apiInstance = require('../config/brevoConfig');

const sendEmail = async (to, subject, textContent) => {
  try {
    const sendSmtpEmail = {
      to: [{ email: to }],
      sender: { email: process.env.EMAIL_USER },
      subject,
      textContent,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
