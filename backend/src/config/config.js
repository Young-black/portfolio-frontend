require('dotenv').config();

module.exports = {
  email: {
    service: process.env.EMAIL_SERVICE || "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
};
