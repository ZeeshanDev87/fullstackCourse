const express = require('express');
const app = express();
const { json } = require('stream/consumers');
const morgan = require('morgan');
app.use(express.json());
var persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)
app.use(morgan('tiny',{options: ':method :url :status :res[content-length] - :response-time ms :body'}));
app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Home page");
  });
app.get('/api/persons', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(persons));
});
app.get('/info', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Phonebook has info for ${persons.length} people\n${new Date()}`);
    });
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  });
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    });
  }

  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: body.name,
    number: body.number
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
});
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  });
const port = 3001;
app.listen(port);
console.log(`Server running at http://localhost:${port}/`);