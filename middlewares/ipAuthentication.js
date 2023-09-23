const ipAuthMiddleware = (req, res, next) => {
  console.log(`entering ipAuthMiddleware`);
  const clientIP = req.body.publicIP;
  const TacosIP = req.app.locals.globalPublicIP;
  console.log(`clientIP: ${clientIP}`);
  console.log(`TacosIP: ${TacosIP}`);
  if (TacosIP === clientIP) {
    console.log(`IP address ${clientIP} is allowed.`);

    next();
  } else {
    // IP is not allowed, return a 403 Forbidden response
    res.status(403).send('Access denied for this IP address.');
  }
};

module.exports = { ipAuthMiddleware };
