export default function errorMiddleware(error, req, res, next) {
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");

    return res.status(400).json({
      success: false,
      message,
    });
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
}
