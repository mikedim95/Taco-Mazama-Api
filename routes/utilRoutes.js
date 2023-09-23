const express = require('express');
const router = express.Router();

// Define your route
router.post('/', (req, res, next) => {
  const { publicIP } = req.body;
  req.app.locals.globalPublicIP = publicIP;

  console.log(`Updated the PublicIP from LocalNode to: `);
  console.log(req.app.locals.globalPublicIP);

  res.status(200).json({ publicIP });
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
