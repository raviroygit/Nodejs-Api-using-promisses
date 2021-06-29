/* eslint-disable newline-after-var */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = [
      'serialNumber',
      '_id',
      'fields',
    ];
    excludedFields.forEach(
      (el) => delete queryObj[el]
    );

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(
      JSON.parse(queryStr)
    );

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort
        .split(',')
        .join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort(
        '-registrationDate'
      );
    }

    return this;
  }
}
module.exports = APIFeatures;
