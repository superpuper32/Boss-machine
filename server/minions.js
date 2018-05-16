const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
  updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.post('/', (req, res, next) => {
  const createMinion = addToDatabase('minions', req.body);
  res.status(201).send(createMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    let deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleteMinion) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  } else {
    res.status(404).send();
  }
});
