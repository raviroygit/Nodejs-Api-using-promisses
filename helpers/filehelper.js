// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       new Date()
//         .toISOString()
//         .replace(/:/g, '-') +
//         '-' +
//         file.originalname
//     );
//   },
// });

// const filefilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: filefilter,
// });

// module.exports = { upload };
const multer = require('multer');

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb('Please upload only csv file.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __filename + '/uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(
      null,
      `${Date.now()}-bezkoder-${
        file.originalname
      }`
    );
  },
});

const uploadFile = multer({
  storage: storage,
  fileFilter: csvFilter,
});

module.exports = uploadFile;
