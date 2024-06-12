function isBrowserRequest(req) {
  if (req.headers["content-type"] === "application/json") {
    return false;
  }
  return true;
}

module.exports = isBrowserRequest;
