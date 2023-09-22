const express = require('express');
const router = express.Router();

// Define your route
router.post('/', (req, res, next) => {
  req.app.locals.globalPublicIP = req.ip;
  res.status(200).send(req.ip);
  console.log(req.ip);
});
router.get('/', (req, res, next) => {
  res
    .status(200)
    .send(
      `the  req.app.locals.globalPublicIP is: ${req.app.locals.globalPublicIP}`,
    );
  console.log(req.app.locals.globalPublicIP);
});

module.exports = router;
