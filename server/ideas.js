const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
  updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
