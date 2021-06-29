const fs = require('fs');
// const ObjectId = require('mongoose').Types.ObjectId;

const utils = require('../utils');
const logger = require('../logger');
// const constant = require('../../constants/index');
// const createPlanService = require('../services/plans');

const terminalService = require('../services/registration');

const importTerminals = samplefile => {
  const funcIdentifier = logger.debugIn(__filename, { importTerminals }, { samplefile });

  const file = samplefile.file;

  return new Promise(async (resolve, reject) => {
    try {
      const uploadedPath = `${process.cwd()}\\data\\tmp\\imports\\${file.name}`;

      let terminalsImported = 0;

      let terminalsImportFailed = 0;

      fs.writeFileSync(uploadedPath, file.data);

      utils.fileSystem.file.readFile(uploadedPath).then(async TerminalsData => {
        if (TerminalsData.length > 0) {
          terminalService.registerbyImport(TerminalsData).then(() => {
            terminalsImported++;
          }).catch(() => {
            terminalsImportFailed++;
          });
          resolve();
        } else {
          logger.warn(__filename, { importTerminals }, funcIdentifier, 'EMPTY_FILE');

          return reject({
            errorCode: 'EMPTY_FILE'
          });
        }

        // fs.unlinkSync(uploadedPath);

      });
    }
    catch (er) {
      logger.warn(__filename, { importTerminals }, funcIdentifier, er);

      return reject({
        errorCode: 'UNKNOWN_ERROR',
        errorDetails: er.toString()
      });
    }
  });
};

module.exports = {
  importTerminals
};
