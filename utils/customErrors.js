const createError = (statusCode, message) => ({
  statusCode,
  message,
});

const BadRequestError = (message = "Bad Request") => createError(400, message);
const UnauthorizedError = (message = "Unauthorized") =>
  createError(401, message);
const ForbiddenError = (message = "Forbidden") => createError(403, message);
const NotFoundError = (message = "Not Found") => createError(404, message);
const ConflictError = (message = "Conflict") => createError(409, message);

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
