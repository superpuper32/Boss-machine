const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { getAllFromDatabase, addToDatabase, deleteFromDatabasebyId, createMeeting } = require('./db');
