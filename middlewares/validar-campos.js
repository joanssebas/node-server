const {check, validationResult} = require("express-validator");

const validarcampos = (req, res, next) => {
  var error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error,
    });
  }

  next();
};

module.exports = {validarcampos};
