const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
  updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
