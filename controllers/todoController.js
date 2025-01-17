const express = require("express");
const router = express.Router();
const todoController = express();

//list of todo's
const todos = [
  {
    id: Date.now(),
    title: "Black Liberation",
    completed: true,
  },
];

// function to see all the todo items
const listToDos = (req, res) => {
  return res.json(todos);
};

//function to create a new to do item
function validateToDo(req, res, next) {
  const { title } = req.body;

  //validate input
  if (!title) {
    return res.status(400).json({ message: "Missing required field: title" });
  }
  next();
}

function createToDo(req, res) {
  const { title } = req.body;

  const newToDo = {
    id: Date.now(),
    title,
    completed: false,
  };

  // Add the new todo to the list
  todos.push(newToDo);

  // Send the created todo back in the response
  res.status(200).json(newToDo);
}

function updateToDo(req, res) {
  const found = todos.some((todo) => todo.id === parseInt(req.params.id)); //search for matching id
//foundIndex experiment
  if (found) {
    const updateInfo = req.body;
    todos.forEach((todo) => {
      if (todo.id === parseInt(req.params.id)) {
        todo.title = updateInfo.title ? updateInfo.title : todo.title;

        res.status(200).json({ msg: `To-Do item updated`, todo });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No To-Do item with the id of ${req.params.id}` });
  }

}

function deleteToDo(req, res) {
  const found = todos.findIndex((todo) => todo.id === parseInt(req.params.id)); //search for matching id

  if (found) {
        res.status(200).json({ 
          msg: `To-Do item deleted`, 
          todo: todos.filter((todo) => todo.id === parseInt(req.params.id) 
         ) })   
  } else {
    res
      .status(400)
      .json({ msg: `No To-Do item with the id of ${req.params.id}` });
  }

}

module.exports = { createToDo, listToDos, validateToDo, updateToDo, deleteToDo };
