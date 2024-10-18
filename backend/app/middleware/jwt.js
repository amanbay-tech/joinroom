function checkJwt(jwt) {
  const api_JWT = process.env.API_JWT;

  if (api_JWT === jwt) {
    return true;
  }
  return false;
}

function jwtVerify(req, res, next) {
  if (checkJwt(req.query.jwt) || checkJwt(req.body.jwt)) return next();

  res.status(403).json({
    error: "Access denied",
    message: "Please provide a valid JSON Web Token (JWT)",
    code: "JWT_ERROR",
  });
}

module.exports = { jwtVerify };
