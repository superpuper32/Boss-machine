const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { getAllFromDatabase, getFromDatabaseById, addToDatabase,
  updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.put('/:IdeaId', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.post('/:ideaId', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    const createIdea = addToDatabase('ideas', req.body);
    res.status(201).send(createIdea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    let deleteIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleteIdea) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  } else {
    res.status(404).send();
  }
});
