const mongoose = require('mongoose');
const BaseClass = require('./BaseClass');

// eslint-disable-next-line no-unused-vars
const Platform = require('./Platform');

const {
  Schema
} = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  platformId: {
    type: Schema.Types.ObjectId,
    ref: 'Platform'
  },

  parameters: {
    type: Object
  },

  lang: {
    type: String,
    required: true,
    trim: true
  },

  projectId: {
    type: String
  },

  createdBy: {
    type: String,
    trim: true
  },

  modifiedBy: {
    type: String,
    trim: true
  },

  enabled: {
    type: Boolean,
    trim: true
  },

  botIterationNumber: {
    type: Number
  },

  maxParallelExecution: {
    type: Number
  }
}, { timestamps: true });

class ConnectionClass extends BaseClass {

}

mongoSchema.loadClass(ConnectionClass);

const Connection = mongoose.model('Connection', mongoSchema);

module.exports = Connection;