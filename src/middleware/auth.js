const jwtUtils = require("../utils/JWTToken");
const isBrowser = require("../utils/isBrowser");

async function authenticationMiddleware(req, res, next) {
  const DEFAULT_ERROR_MESSAGE = "Unauthorized";
  const isBrowserRequest = isBrowser(req);
  if (req.cookies.token) {
    const token = req.cookies.token;
    try {
      const decoded = jwtUtils.verifyToken(token);
      if (!decoded) {
        if (isBrowserRequest) {
          return res.redirect("/");
        } else {
          return res.status(401).json({ message: DEFAULT_ERROR_MESSAGE });
        }
      }
      req.user = decoded;
      return next();
    } catch (error) {
      if (isBrowserRequest) {
        return res.redirect("/");
      } else {
        return res.status(401).json({ message: DEFAULT_ERROR_MESSAGE });
      }
    }
  } else if (req.headers.authorization) {
    const header = req.headers.authorization;
    const token = header.split("Bearer ")[1];
    try {
      const decoded = jwtUtils.verifyToken(token);
      if (!decoded) {
        if (isBrowserRequest) {
          return res.redirect("/");
        } else {
          return res.status(401).json({ message: DEFAULT_ERROR_MESSAGE });
        }
      }
      req.user = decoded;
      return next();
    } catch (error) {
      if (isBrowserRequest) {
        return res.redirect("/");
      } else {
        return res.status(401).json({ message: DEFAULT_ERROR_MESSAGE });
      }
    }
  }
  if (isBrowserRequest) {
    return res.redirect("/");
  } else {
    return res.status(401).json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

module.exports = authenticationMiddleware;
