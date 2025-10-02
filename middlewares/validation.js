const Joi = require('joi');

const userValidation = Joi.object({
  firstName: Joi.string().required(),
  dob: Joi.date().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  state: Joi.string().required(),
  zip: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  userType: Joi.string().required()
});

module.exports = {
  userValidation
};