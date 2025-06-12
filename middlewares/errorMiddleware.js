const errorMiddleware = (error, req, res, next) => {
  try {
    console.error(`Error occurred: ${error.message}`, error.stack);

    // Handle specific Sequelize errors
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({
        success: false,
        error: "Database error",
        message: "An issue occurred with the database. Please try again later.",
      });
    }

    // Handle validation errors (e.g., invalid input)
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        message: error.errors.map((err) => err.message),
      });
    }

    // Generic error response
    res.status(error.status || 500).json({
      success: false,
      error: "Internal server error",
      message: error.message || "Something went wrong. Please try again.",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
