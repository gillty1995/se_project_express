class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class ConflictError extends CustomError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
