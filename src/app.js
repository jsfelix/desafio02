const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const repository = {
    id: uuid(), url, title, techs, likes: 0
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { url, title, techs } = request. body;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0)
    return response.status(400).json({ error: 'Repository not found'});
  
  const likes = repositories[repositoryId].likes;

  const repository = {
    id,
    url,
    title,
    techs, 
    likes
  }

  repositories[repositoryId] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0)
    return response.status(400).json({ error: 'Repository not found'});
  
  repositories.splice(repositoryId, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0)
    return response.status(400).json({ error: 'Repository not found'});
  
  repositories[repositoryId].likes++;
  return response.json(repositories[repositoryId]);
});

module.exports = app;
