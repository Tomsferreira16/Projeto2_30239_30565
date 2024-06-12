async function onlyAdminMiddleware(req, res, next) {
  if (req.user.admin) {
    return next();
  }
  return res.status(403).json({ error: "Forbidden" });
}

module.exports = onlyAdminMiddleware;
