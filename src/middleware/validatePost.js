

export function validate(schema) {
  return function (req, res, next) {
    const { value, error } = schema.validate(req.body,{
      abortEarly: false,   // collect all errors
      stripUnknown: true,  // remove extra fields
    });

    if (error) {
      const message = error.details.map(err => err.message);

      return res.status(400).json({
        success: false,
        errors: message
      })
    }

    req.body = value;
    next();
  };
}
