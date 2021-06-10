// Custom input validator

// Takes the input fields and check them against the required fields
// Makes a list of all the missing fields
const validate = (request, fields) => {
  let missing = [];

  for (field in fields) {
    // Special validation if password is given
    if (field == "password" && request.password) {
      if (request.password.length < 8) {
        return {
          success: false,
          message: "Password must be at least 8 characters long.",
        };
      }
    }
    //console.log(Object.values(request));
    if (!Object.keys(request).includes(field)) {
      missing.push(field);
    }
  }
  if (missing.length !== 0) {
    // Some fancy text formatting
    if (missing.length === 1) {
      missingList = missing;
      isAre = "is";
    } else {
      missingList = missing.slice(0, -1);
      missingList = missingList.join(", ");
      missingList = `${missingList} and ${missing[missing.length - 1]}`;
      isAre = "are";
    }

    return {
      success: false,
      message: `${missingList} ${isAre} missing from the request.`,
    };
  }
  return {
    success: true,
    message: "Validation completed successfully.",
  };
};

// One-liner for every type of response throughout the server
const response = (res, status, success, message, payload) => {
  return res.status(status).json({
    success: success,
    message: message,
    payload: payload,
  });
};

module.exports = {
  validate,
  response,
};
