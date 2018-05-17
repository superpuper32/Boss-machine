const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
  updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  let updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.post('/', (req, res, next) => {
  const createIdea = addToDatabase('ideas', req.body);
  res.status(201).send(createIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  let deleteIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleteIdea) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
