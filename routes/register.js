/* eslint-disable prefer-arrow-callback */
const express = require('express');
const router = express.Router();
const Register = require('../services/registration');
const Terminal = require('../models/Register');
router.get('/search', (req, res) => {
  const serialNumber = req.query.serialNumber;

  const queryStr = JSON.stringify(serialNumber);

  Register.searchBySerialNumber(
    JSON.parse(queryStr)
  )
    .then((status) => {
      res.json({ status });
    })
    .catch((err) => {
      res.status(401).json({
        err: err,
      });
    });
});

router.get('/searchById', (req, res) => {
  const id = req.query.id;
  let queryStr = JSON.stringify(id);

  queryStr = queryStr.replace(
    /\b(id)\b/g,
    (match) => `_${match}`
  );

  Register.searchById(JSON.parse(queryStr))
    .then((status) => {
      res.json({ status });
    })
    .catch((err) => {
      res.status(401).json({
        err: err,
      });
    });
});
/* to register the terminal */
router.post('/register',async (req, res) => {
  const {
    serialNumber,
    systemIdentifier,
    acquirerIPAddress,
    acquiredPort,
    TLS,
    acceptanceSystemID,
    ISA,
    applicationId,
    settingId,
    terminalStoreId,
  } = req.body;
    const query = req.body.serialNumber;
    const body=Terminal.findOne({serialNumber:serialNumber});

  Register.register(
    serialNumber,
    systemIdentifier,
    acquirerIPAddress,
    acquiredPort,
    TLS,
    acceptanceSystemID,
    ISA,
    applicationId,
    settingId,
    terminalStoreId
  )
    .then((status) => {
      if(query!==body){        res.json({ status });
    }


    })
    .catch((err) => {
      res.status(401).json({
        err: err.message,
      });
    });
});

router.get('/terminal-list', (req, res) => {
  Register.getAllTerminals(req.query)
    .then((status) => {
      res.json({ status });
    })
    .catch((err) => {
      res.status(401).json({
        err: err,
      });
    });
});

router.post('/updateTerminal/:serialNumber', (req, res) => {
  const data = req.body;

  Register.updateTerminal(req.params.serialNumber, data)
 
    .then((status) => {
      if(req.params.serialNumber!==req.body.serialNumber) {res.json({ status });}
      else{
        res.send("can not be modify serial number!")}

    })
    .catch((err) => {
      res.status(401).json({
        err:err.message,
      });
    });
});

router.get('/:id', (req, res) => {
  Register.terminalById(req.params.id)
    .then((status) => {
      res.json({ status });
    })
    .catch((err) => {
      res.status(401).json({
        err: err,
      });
    });
});

// router.delete('/:id', (req, res) => {
//   Register.deleteTerminalById(req.params.id)
//     .then((status) => {
//       res.json({ status });
//     })
//     .catch((err) => {
//       res.status(401).json({
//         err: err,
//       });
//     });
// });

module.exports = router;
