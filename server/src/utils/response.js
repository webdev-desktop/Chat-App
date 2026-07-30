export default function (res, data, message, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
}
