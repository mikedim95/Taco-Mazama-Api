const ipAuthMiddleware = (req, res, next) => {
  console.log(`Entering ipAuthMiddleware`);
  try {
    const clientIP = req.body.publicIP;
    const TacosIP = req.app.locals.globalPublicIP;
    console.log(`Client IP: ${clientIP}`);
    console.log(`Tacos IP: ${TacosIP}`);

    if (TacosIP === clientIP) {
      console.log(`IP address ${clientIP} is allowed.`);
      next();
    } else {
      // IP is not allowed, return a 403 Forbidden response
      res.status(403).send('Access denied for this IP address.');
    }
  } catch (error) {
    // Catch any errors and pass them to the error handling middleware
    next(error);
  }
};

module.exports = { ipAuthMiddleware };
