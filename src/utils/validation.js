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

const updatedUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().required().optional(),
  password: Joi.string().required().min(6).optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),
  address: Joi.object({
    street: Joi.string().trim().min(3).max(100).optional(),
    city: Joi.string().trim().min(2).max(50).optional(),
    state: Joi.string().trim().min(2).max(50).optional(),
    zipcode: Joi.string()
      .trim()
      .pattern(/^[1-9][0-9]{5}$/)
      .optional(),
    country: Joi.string().trim().min(2).max(50).optional(),
  }).optional(),
  isAdmin: Joi.boolean().optional(),
  isRestaurantOwner: Joi.boolean().optional(),
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
  updatedUserSchema,
};
