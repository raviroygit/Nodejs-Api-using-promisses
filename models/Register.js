const mongoose = require('mongoose');
const BaseClass = require('./BaseClass');
var uniqueValidator = require('mongoose-unique-validator');
const RegisterSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      index:true,
      unique: true,
      required: true,
      trim: true,
      min: 1,
      max: 20,
     
    },
    systemIdentifier: {
      type: String,
      trim: true,
      required: true,
      min: 1,
      max: 20,
    },
    acquirerIPAddress: {
      type: String,
      trim: true,
      required: true,
      min: 1,
      max: 15,
    },
    acquiredPort: {
      type: String,
      trim: true,
      required: true,
      min: 1,
      max: 5,
    },
    TLS: {
      type: Boolean,
    },
    acceptanceSystemID: {
      type: String,
      trim: true,
    },
    ISA: {
      type: String,
      trim: true,
    },
    applicationId: {
      type: String,
      trim: true,
    },
    terminalStoreId: {
      type: String,
      trim: true,
    },
    settingId: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      // default: 'default.jpg',
    },
    registrationDate: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
    lastCallDate: Date,
    status: {
      type: String,
      required: true,
      enum: ['Declared', 'Active', 'Inactive'],
      default: 'Declared',
    },
  },
  { timestamps: true }
);

class ProjectClass extends BaseClass {}

RegisterSchema.loadClass(ProjectClass);
RegisterSchema.plugin(uniqueValidator);
const Register = mongoose.model(
  'Register',
  RegisterSchema
);

module.exports = Register;
