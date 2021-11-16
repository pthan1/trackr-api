const express = require('express')
const app = express()
const cors = require('cors');

app.set("port", process.env.PORT || 5000);
app.locals.title = 'Trackr API';
app.use(express.json())
app.use(cors());

app.locals.savedRepos = [];

app.get("/", (req, res) => {
  res.send("Welcome to the trackr api")
})


app.get('/api/v1/repos', (req, res) => {
  const repos = app.locals.savedRepos;
  res.send(repos)
})

app.post('/api/v1/repos', (req, res) => {
  const newRepo = req.body;
  const isRepoSaved = app.locals.savedRepos.some(repo => repo.id === newRepo.id);

  if (isRepoSaved) {
    res.status(400).send("Repo already in list")
  }
  else {
    app.locals.savedRepos.push(newRepo);
    res.send(app.locals.savedRepos);
}})

app.delete('/api/v1/repos/:id', (request, response) => {
	const foundRepo = app.locals.savedRepos.find((repo) => repo.id === parseInt(request.params.id));

	if (!foundRepo) {
		return response.status(404).json('Repo not found');
	}

	app.locals.savedRepos = app.locals.savedRepos.filter((repo) => repo.id !== parseInt(request.params.id));

	response.status(200).send(app.locals.savedRepos);
});

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get("port")}.`)
})