const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.error(err.stack);
  let errorResponse = {
    error: {
      title: "",
      message: err.message,
      stacktrace: err.stack
    }
  };
  switch (statusCode) {
    case 400:
      errorResponse.error.title = "Bad Request";
      break;
    case 401:
      errorResponse.error.title = "Unauthorized";
      break;
    case 403:
      errorResponse.error.title = "Forbidden";
      break;
    case 404:
      errorResponse.error.title = "Not Found";
      break;
    case 500:
      errorResponse.error.title = "Internal Server Error";
      errorResponse.error.message = "Something went wrong on the server.";
      break;
    default:
      errorResponse.error.title = "Unknown Error";
      errorResponse.error.message = "An unknown error occurred.";
      break;
  }
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
