const loginAttempts = {};

exports.checkLoginAttempts = (req, res, next) => {
  const ipAddress = req.ip;

  if (!loginAttempts[ipAddress]) {
    loginAttempts[ipAddress] = {
      attempts: 1,
      timestamp: Date.now(),
    };
  } else {
    const now = Date.now();
    const lastAttempt = loginAttempts[ipAddress];

    if (now - lastAttempt.timestamp > 5 * 60 * 1000) {
      // reset attempts if last attempt was more than 5 minutes ago
      loginAttempts[ipAddress] = {
        attempts: 1,
        timestamp: now,
      };
    } else {
      // increment attempts and check if they exceed 10
      loginAttempts[ipAddress].attempts += 1;

      if (loginAttempts[ipAddress].attempts > 10) {
        return res.status(403).json({
          success: false,
          message: "Too many login attempts. Please try again in 5 minutes.",
        });
      }
    }
  }

  next();
};
