const Joi = require("joi");

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  address: Joi.string(),
  isAdmin: Joi.boolean(),
  isRestaurantOwner: Joi.boolean(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validate Middleware

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
module.exports = {
  validate,
  registerSchema,
  loginSchema,
};
