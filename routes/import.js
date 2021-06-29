const express = require('express');
const router = express.Router();
const importService = require('../services/importRegistrations');

router.post('/', (req, res, next) => {
  // const {file} = req.body;

  const sampleFile = req.files;

  importService
    .importTerminals(sampleFile)
    .then(() => {
      res.send({ success:true });
      next();
    })
    .catch((err) => {
      res.status(401).json({
        err: err,
      });
      next();
    });
});

module.exports = router;
