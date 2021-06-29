const Terminal = require('../models/Register');
const APIFeatures = require('../utils/apiFeatures');
const logger = require('../logger');

const register = (
  serialNumber,
  systemIdentifier,
  acquirerIPAddress,
  acquiredPort,
  TLS,
  acceptanceSystemID,
  ISA,
  terminalStoreId,
  applicationId,
  settingId
) => {
  const funcIdentifier = logger.debugIn(
    __filename,
    { register },
    {
      serialNumber,
      systemIdentifier,
      acquirerIPAddress,
      acquiredPort,
      TLS,
      acceptanceSystemID,
      ISA,
      terminalStoreId,
      applicationId,
      settingId,
    }
  );

  return new Promise(async (resolve, reject) => {
    try {
     
      const data = {
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
      };
      const insertedData = await Terminal.create(
        data
      );

      if (insertedData) {
        logger.debugOut(
          __filename,
          { register },
          funcIdentifier,
          0
        );

        return resolve(
          'Terminal Registration Successfull'
        );
      }

      logger.warn(
        __filename,
        { register },
        funcIdentifier,
        'TERMINAL_NOT_FOUND'
      );

      return reject({
        errorCode: 'TERMINAL_NOT_FOUND',
      });
    } catch (err) {
      logger.warn(
        __filename,
        { register },
        funcIdentifier,
        err
      );

      reject(err);
    }
  });
};

const registerbyImport = (terminals) => {
  const funcIdentifier = logger.debugIn(
    __filename,
    { registerbyImport },
    { terminalData: terminals }
  );

  return new Promise(async (resolve, reject) => {
    try {
      terminals = JSON.parse(
        JSON.stringify(terminals)
      );

      const TerminalsToInsert = [];

      for (let index = 0; index < terminals.length; index++) {
        const oneRow = {
          serialNumber:
            terminals[index]['serialNumber'],
          systemIdentifier:
            terminals[index]['systemIdentifier'],
          acquirerIPAddress:
            terminals[index]['acquirerIPAddress'],
          acquiredPort:
            terminals[index]['acquiredPort'],
          TLS: terminals[index]['TLS'],
        };

        TerminalsToInsert.push(oneRow);
      }

      const insertedData =
        await Terminal.insertMany(
          TerminalsToInsert
        );

      if (insertedData) {
        logger.debugOut(
          __filename,
          { registerbyImport },
          funcIdentifier,
          0
        );

        return resolve(
          'Import CSV into database successfully.'
        );
      }

      logger.warn(
        __filename,
        { registerbyImport },
        funcIdentifier,
        'TERMINAL_NOT_FOUND'
      );

      return reject({
        errorCode: 'TERMINAL_NOT_FOUND',
      });
    } catch (err) {
      logger.warn(
        __filename,
        { registerbyImport },
        funcIdentifier,
        err
      );

      reject(err);
    }
  });
};

// get All terminals
const getAllTerminals = () => {
  const funcIdentifier = logger.debugIn(
    __filename,
    { getAllTerminals }
  );

  return new Promise(async (resolve, reject) => {
    try {
      const features = new APIFeatures(
        Terminal.find()
      );

      const terminals = await features.query;

      // console.log(terminals);

      if (terminals) {
        logger.debugOut(
          __filename,
          { getAllTerminals },
          funcIdentifier,
          0
        );

        return resolve(terminals);
      }

      logger.warn(
        __filename,
        { getAllTerminals },
        funcIdentifier,
        'TERMINAL_NOT_FOUND'
      );

      return reject({
        errorCode: 'TERMINAL_NOT_FOUND',
      });
    } catch (err) {
      logger.warn(
        __filename,
        { getAllTerminals },
        funcIdentifier,
        err
      );

      return reject({
        errorCode: 'UNKNOWN_ERROR',
        errorDetails: err.toString(),
      });
    }
  });
};



// update Terminal by serial number
const updateTerminal = (serialNumber, data) => {
  const funcIdentifier = logger.debugIn(
    __filename,
    { updateTerminal },
    {
      serialNumber,
      data,
    }
  );

  return new Promise(async (resolve, reject) => {
    try {
     
        const updatedTerminal =
        await Terminal.updateMany(
       {   // {
          //   _id: _id,
          // },
          serialNumber,
          data,
          // {
          //   // new: true,
          //   runValidators: true,
          // }
        }
        );
      
      if (updatedTerminal) {
        logger.debugOut(
          __filename,
          { updateTerminal },
          funcIdentifier,
          0
        );

        return resolve(updatedTerminal);
      }

      logger.warn(
        __filename,
        { updateTerminal },
        funcIdentifier,
        'TERMINAL_NOT_UPDATED'
      );

      return reject({
        errorCode: 'TERMINAL_NOT_UPDATED',
      });
    } catch (err) {
      logger.warn(
        __filename,
        { updateTerminal },
        funcIdentifier,
        err
      );

      return reject({
        errorCode: 'UNKNOWN_ERROR',
        errorDetails: err.toString(),
      });
    }
  });
};


// // update Terminal
// const updateTerminal = (_id, data) => {
//   const funcIdentifier = logger.debugIn(
//     __filename,
//     { updateTerminal },
//     {
//       _id,
//       data,
//     }
//   );

//   return new Promise(async (resolve, reject) => {
//     try {
//       const updatedTerminal =
//         await Terminal.findByIdAndUpdate(
//           {
//             _id: _id,
//           },
//           data,
//           {
//             // new: true,
//             runValidators: true,
//           }
//         );

//       if (updatedTerminal) {
//         logger.debugOut(
//           __filename,
//           { updateTerminal },
//           funcIdentifier,
//           0
//         );

//         return resolve(updatedTerminal);
//       }

//       logger.warn(
//         __filename,
//         { updateTerminal },
//         funcIdentifier,
//         'CONNECTION_NOT_FOUND'
//       );

//       return reject({
//         errorCode: 'CONNECTION_NOT_FOUND',
//       });
//     } catch (err) {
//       logger.warn(
//         __filename,
//         { updateTerminal },
//         funcIdentifier,
//         err
//       );

//       return reject({
//         errorCode: 'UNKNOWN_ERROR',
//         errorDetails: err.toString(),
//       });
//     }
//   });
// };

// Get terminal by id
const terminalById = (_id) => {
  const funcIdentifier = logger.debugIn(
    __filename,
    { terminalById },
    { _id }
  );

  return new Promise(async (resolve, reject) => {
    try {
      const terminalById =
        await Terminal.findById({ _id: _id });

      if (terminalById) {
        logger.debugOut(
          __filename,
          { terminalById },
          funcIdentifier,
          0
        );

        return resolve(terminalById);
      }

      logger.warn(
        __filename,
        { terminalById },
        funcIdentifier,
        'TERMINAL_NOT_FOUND'
      );

      return reject({
        errorCode: 'TERMINAL_NOT_FOUND',
      });
    } catch (err) {
      logger.warn(
        __filename,
        { terminalById },
        funcIdentifier,
        err
      );

      return reject({
        errorCode: 'UNKNOWN_ERROR',
        errorDetails: err.toString(),
      });
    }
  });
};

// // for deleting terminal
// const deleteTerminalById = (_id) => {
//   const funcIdentifier = logger.debugIn(
//     __filename,
//     { terminalById },
//     { _id }
//   );

//   return new Promise(async (resolve, reject) => {
//     try {
//       const terminal =
//         await Terminal.findByIdAndDelete({
//           _id: _id,
//         });

//       if (terminal) {
//         logger.debugOut(
//           __filename,
//           { terminalById },
//           funcIdentifier,
//           0
//         );

//         return resolve(terminalById);
//       }

//       logger.warn(
//         __filename,
//         { terminalById },
//         funcIdentifier,
//         'CONNECTION_NOT_FOUND'
//       );

//       return reject({
//         errorCode: 'CONNECTION_NOT_FOUND',
//       });
//     } catch (err) {
//       logger.warn(
//         __filename,
//         { terminalById },
//         funcIdentifier,
//         err
//       );

//       return reject({
//         errorCode: 'UNKNOWN_ERROR',
//         errorDetails: err.toString(),
//       });
//     }
//   });
// };

//search terminal by  serialNumber
const searchBySerialNumber = (serialNumber) => {
  const funcIdentifier = logger.debugIn(
    __filename,
    { searchBySerialNumber },
    { serialNumber }
  );

  return new Promise(async (resolve, reject) => {
    try {
      const SearchResult = Terminal.find({
        serialNumber,
      });

      const result = await SearchResult;

      if (result) {
        logger.debugOut(
          __filename,
          { searchBySerialNumber },
          funcIdentifier,
          0
        );

        return resolve(result);
      }

      logger.warn(
        __filename,
        { searchBySerialNumber },
        funcIdentifier,
        'TERMINAL_NOT_FOUND'
      );

      return reject({
        errorCode: 'TERMINAL_NOT_FOUND',
      });
    } catch (err) {
      logger.warn(
        __filename,
        { searchBySerialNumber },
        funcIdentifier,
        err
      );

      return reject({
        errorCode: 'UNKNOWN_ERROR',
        errorDetails: err.toString(),
      });
    }
  });
};

//Search By Id
const searchById = (_id) => {
  const funcIdentifier = logger.debugIn(
    __filename,
    { searchById },
    { _id }
  );

  return new Promise(async (resolve, reject) => {
    try {
      const SearchResult = Terminal.findById({
        _id: _id,
      });

      const result = await SearchResult;

      if (result) {
        logger.debugOut(
          __filename,
          { searchById },
          funcIdentifier,
          0
        );

        return resolve(result);
      }

      logger.warn(
        __filename,
        { searchById },
        funcIdentifier,
        'TERMINAL_NOT_FOUND'
      );

      return reject({
        errorCode: 'TERMINAL_NOT_FOUND',
      });
    } catch (err) {
      logger.warn(
        __filename,
        { searchById },
        funcIdentifier,
        err
      );

      return reject({
        errorCode: 'UNKNOWN_ERROR',
        errorDetails: err.toString(),
      });
    }
  });
};

module.exports = {
  searchBySerialNumber,
  // deleteTerminalById,
  terminalById,
  updateTerminal,
  getAllTerminals,
  register,
  searchById,
  registerbyImport,
};
