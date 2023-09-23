const express = require('express');
const router = express.Router();

// Define your route
router.post('/', (req, res, next) => {
  req.app.locals.globalPublicIP = req.body.publicIP;
  res.status(200).send(req.app.locals.globalPublicIP);
  console.log(`Updated the PublicIP from LocalNode to: `);
  console.log(req.app.locals.globalPublicIP);
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
