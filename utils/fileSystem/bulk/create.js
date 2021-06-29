const fs = require('fs');

const create = (directories, callback, index = 0) => {
  if (directories.length === index) {
    return callback();
  }

  fs.exists(directories[index], exists => {
    if (exists) {
      return create(directories, callback, ++index);
    }

    fs.mkdir(directories[index], () => {
      return create(directories, callback, ++index);
    });
  });
};

module.exports = create;
