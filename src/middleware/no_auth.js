const isBrowser = require("../utils/isBrowser");
const jwtUtils = require("../utils/JWTToken");

async function noAuthenticationMiddleware(req, res, next) {
  const DEFAULT_ERROR_MESSAGE = "Unauthorized";
  const isBrowserRequest = isBrowser(req);
  if (req.cookies.token) {
    const token = req.cookies.token;
    try {
      const decoded = jwtUtils.verifyToken(token);
      if (decoded) {
        if (isBrowserRequest) {
          return res.redirect("/pr");
        } else {
          return res.status(401).json({ message: DEFAULT_ERROR_MESSAGE });
        }
      }
      return next();
    } catch (error) {
      return next();
    }
  } else if (req.headers.authorization) {
    const header = req.headers.authorization;
    const token = header.split("Bearer ")[1];
    try {
      const decoded = jwtUtils.verifyToken(token);
      if (decoded) {
        if (isBrowserRequest) {
          return res.redirect("/pr");
        } else {
          return res.status(401).json({ message: DEFAULT_ERROR_MESSAGE });
        }
      }
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
}

module.exports = noAuthenticationMiddleware;
