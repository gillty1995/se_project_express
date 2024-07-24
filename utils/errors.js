const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid data.",
  NOT_FOUND: "Data not found.",
  INTERNAL_SERVER_ERROR: "An error has occurred on the server.",
  CONFLICT: "Conflict with existing data.",
  UNAUTHORIZED: "Incorrect email or password.",
  FORBIDDEN: "This action is forbidden",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
