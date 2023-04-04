const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.error(err.stack);
  switch (statusCode) {
    case 400:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackrace: err.stack
      });
      break;
    case 401:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackrace: err.stack
      });
      break;
    case 403:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackrace: err.stack
      });
      break;
    case 404:
      res.json({
        title: "Not Found",
        message: err.message,
        stackrace: err.stack
      });
      break;
    case 500:
      res.json({
        title: "Internal Server Error",
        message: "Something went wrong on the server.",
        stackrace: err.stack
      });
      break;
    default:
      res.json({
        title: "Unknown Error",
        message: "An unknown error occurred.",
        stackrace: err.stack
      });
      break;
  }
};

module.exports = errorHandler;
