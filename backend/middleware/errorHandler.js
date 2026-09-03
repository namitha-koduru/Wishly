// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    console.error('Error:', err.stack || err.message);
  } else {
    console.error('API Error:', err.message);
  }

  const statusCode = err.status || 500;
  const message = isProd && statusCode === 500
    ? 'Something went wrong. Please try again.'
    : (err.message || 'Internal Server Error');

  res.status(statusCode).json({
    success: false,
    message
  });
};

export default errorHandler;
