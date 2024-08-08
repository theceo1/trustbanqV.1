// backend/src/config/brevoConfig.js
const SibApiV3Sdk = require('@sendinblue/client');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

module.exports = apiInstance;
