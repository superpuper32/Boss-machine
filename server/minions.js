const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
  updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.post('/', (req, res, next) => {
  const createMinion = addToDatabase('minions', req.body);
  res.status(201).send(createMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    let deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleteMinion) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});
