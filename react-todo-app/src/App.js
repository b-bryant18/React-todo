import React, { useState } from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, deleteTodo }) {
  return (
    // textDecoration uses a ternary operator to make a line through completed todos, else nothing.
    <div style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }} className="todo">
      {todo.text}
      {/* function for striking through completed todos, index tells the app which todo has been clicked*/}
      <button onClick={() => completeTodo(index)}>Complete</button>
      <button onClick={() => deleteTodo(index)}>X</button>
    </div>
  )
}

function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.prevent.default();
    //If value is empty don't submit
    if (!value) return;
    addTodo(value);
    //clears the form out after submitting a new todo
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
        className="input"
        placeholder="Add new task"
        //this is the value of the state
        value={value}
        //what we named the method to update the state
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false
    },
    {
      text: 'Build cool todo app',
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    //the ... spread operator takes array of existing todos and adds text to it
    const newTodos = [...todos, { text }];
    //setTodos updates the current state
    setTodos(newTodos);
  }

  const completeTodo = index => {
    //array with existing todos
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    //sets state
    setTodos(newTodos);
  }

  const deleteTodo = index => {
    const newTodos = [...todos];
    //splice modifies arrays by removing elements and/or adding new ones
    newTodos.splice(index, 1);
    //sets state as array without the deleted element
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}
export default App;