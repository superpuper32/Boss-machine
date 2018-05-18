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

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter(minionWork => {
    return minionWork.minionId = req.params.minionId;
  });
  res.send(work);
});

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const minionWork = req.body;
  minionWork.minionId = req.params.minionId;
  const createMinionWork = addToDatabase('work', minionWork);
  res.status(201).send(createMinionWork);
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    let deleteMinion = deleteFromDatabasebyId('work', req.params.workId);
    if (deleteMinion) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});
