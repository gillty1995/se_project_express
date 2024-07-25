const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid data.",
  UNAUTHORIZED: "Incorrect email or password.",
  FORBIDDEN: "This action is forbidden",
  NOT_FOUND: "Data not found.",
  CONFLICT: "Conflict with existing data.",
  INTERNAL_SERVER_ERROR: "An error has occurred on the server.",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
