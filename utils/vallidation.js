/* eslint-disable import/no-extraneous-dependencies */
const { body, validationResult } = require('express-validator');

// Custom validation function to check if a string contains only alphabetic characters
const isAlphaString = (value) => {
  if (typeof value !== 'string') {
    return false;
  }
  return /^[a-zA-Z]+$/.test(value);
};

const validateOrder = [
  // Validate tableNo
  body('tableNo.id')
    .isInt({ min: 1 })
    .withMessage('Table ID must be a positive integer'),

  // Validate price
  body('price').isNumeric().withMessage('Price must be a number'),

  // Validate dish
  body('dish')
    .optional()
    .isArray()
    .withMessage('Dish must be an array')
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        // Skip validation if "dish" is not an array
        return true;
      }
      value.forEach((dishItem) => {
        if (
          typeof dishItem.title !== 'string' ||
          !isAlphaString(dishItem.title)
        ) {
          throw new Error('Dish title must contain only alphabetic characters');
        }
      });

      return true;
    }),
  body('dish.*.id')
    .optional()
    .isInt()
    .withMessage('Dish ID must be a positive integer'),

  // Validate dishes stuffing
  body('dish.*.stuffing')
    .optional()
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        return true;
      }
      if (value.some((item) => !isAlphaString(item))) {
        throw new Error('Stuffing must contain only alphabetic characters');
      }
      return true;
    }),

  // Validate dishes ingredients
  body('dish.*.ingredients')
    .optional()
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        return true;
      }
      if (value.some((item) => !isAlphaString(item))) {
        throw new Error('Ingredients must contain only alphabetic characters');
      }
      return true;
    }),

  // Validate dishes salsa
  body('dish.*.salsa')
    .optional()
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        return true;
      }
      if (value.some((item) => !isAlphaString(item))) {
        throw new Error('Salsa must contain only alphabetic characters');
      }
      return true;
    }),

  // Validate dishes extras
  body('dish.*.extras')
    .optional()
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        return true;
      }
      if (value.some((item) => !isAlphaString(item))) {
        throw new Error('Extras must contain only alphabetic characters');
      }
      return true;
    }),
  body('dish.*.multiplier')
    .optional()
    .isNumeric()
    .withMessage('Multiplier must be a number'),
  body('dish.*.comments')
    .optional()
    .isArray()
    .withMessage('Comments must be an array'),

  // Validate sides
  body('sides')
    .optional()
    .isArray()
    .withMessage('Sides must be an array')
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        // Skip validation if "side" is not an array
        return true;
      }
      value.forEach((dishItem) => {
        if (
          typeof dishItem.title !== 'string' ||
          !isAlphaString(dishItem.title)
        ) {
          throw new Error('Side title must contain only alphabetic characters');
        }
      });

      return true;
    }),

  body('sides.*.id')
    .optional()
    .isInt()
    .withMessage('Side ID must be a positive integer'),
  // Validate sides title
  body('sides.*.title')
    .optional()
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        return true;
      }
      if (value.some((item) => !isAlphaString(item))) {
        throw new Error('Sides title must contain only alphabetic characters');
      }
      return true;
    }),
  body('sides.*.multiplier')
    .optional()
    .isNumeric()
    .withMessage('Multiplier must be a number'),
  body('sides.*.comments')
    .optional()
    .isArray()
    .withMessage('Comments must be an array'),

  // Validate beverages
  body('beverages')
    .optional()
    .isArray()
    .withMessage('Beverages must be an array')
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        // Skip validation if "beverages" is not an array
        return true;
      }
      value.forEach((dishItem) => {
        if (
          typeof dishItem.title !== 'string' ||
          !isAlphaString(dishItem.title)
        ) {
          throw new Error(
            'Beverages title must contain only alphabetic characters',
          );
        }
      });

      return true;
    }),

  body('beverages.*.id')
    .optional()
    .isInt()
    .withMessage('Beverage ID must be a positive integer'),
  // Validate beverages title
  body('beverages.*.title')
    .optional()
    .custom((value, { req }) => {
      if (!Array.isArray(value)) {
        return true;
      }
      if (value.some((item) => !isAlphaString(item))) {
        throw new Error(
          'beverages title must contain only alphabetic characters',
        );
      }
      return true;
    }),

  body('beverages.*.multiplier')
    .optional()
    .isNumeric()
    .withMessage('Multiplier must be a number'),
  body('beverages.*.comments')
    .optional()
    .isArray()
    .withMessage('Comments must be an array'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { validateOrder, handleValidationErrors };
