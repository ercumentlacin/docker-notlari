const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const { Todo } = require('./Todo');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  Todo.find({})
    .then((todoList) => res.status(200).json(todoList))
    .catch((error) => res.status(500).json(error));
});

app.post('/', (req, res) => {
  const { body } = req;
  const newTodo = new Todo(body);

  newTodo
    .save()
    .then((todo) => res.status(201).json(todo))
    .catch((error) => res.status(400).json(error));
});

async function connectDB() {
  const image_name = 'dc-mongodb'; // from docker-compose.yml
  const MONGO_URI = `mongodb://${image_name}:27017/todos`;
  await mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log('Connected to the database');
      app.listen(PORT, async () => {
        console.log(`Server listening on port http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.dir(err);
      console.log('Error connecting to the database');
      process.exit(1);
    });
}

connectDB();
