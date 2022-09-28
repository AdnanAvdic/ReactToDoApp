import "../styles/TodoForm.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TodoList from "./TodoList";
import FilteredList from "./FilteredList";

function TodoForm() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [inputValue, setInputValue] = useState("");
  const [filteredInputValue, setFilteredInputValue] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [editTask, setEditTask] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newTask = {
      id: new Date().getTime(),
      text: inputValue,
      completed: false,
      created: new Date().toLocaleTimeString(),
      deadlineDate: deadline.toLocaleDateString(),
    };

    setTasks((prevTasks) => (prevTasks = [...tasks].concat(newTask)));
    setInputValue("");
  }

  //function updates the task with new task

  function editingTask(id) {
    const editedTasks = [...tasks].map((element) => {
      if (element.id === id) {
        element.text = editInputValue;
      }
      return element;
    });

    setTasks((prevEditedTasks) => (prevEditedTasks = editedTasks));
    setEditTask(null);
    setEditInputValue("");
  }

  //This delete function deletes a task and
  //is sent to child component via props in TodoList component

  function deleteTask(id) {
    const updatedTasks = [...tasks].filter((task) => task.id !== id);

    setTasks((prevUpdatedTasks) => (prevUpdatedTasks = updatedTasks));
  }

  //Renders task completed text when task is done

  function completeTask(id) {
    const updatedTasks = [...tasks].map((element) => {
      if (element.id === id) {
        element.completed = !element.completed;
      }
      return element;
    });

    setTasks((prevTasks) => (prevTasks = updatedTasks));
  }

  //getting value from search input

  function inputHandler(e) {
    var filterValue = e.target.value.toLowerCase();
    setFilteredInputValue(filterValue);
  }

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Add task here..."
          className="task-input"
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
        />

        <button className="add-btn">Add todo</button>
      </form>

      <h3 className="date-picker-title">Deadline:</h3>
      <DatePicker
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        selected={deadline}
        onSelect={(date) => setDeadline(date)}
      />

      <div>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={inputHandler}
        ></input>

        <select className="sort-selector">
          <option>Default</option>
          <option>Sort by name</option>
          <option>Sort by deadline</option>
          <option>Sort by completion</option>
        </select>
      </div>

      {filteredInputValue === "" ? (
        <TodoList
          tasks={tasks}
          handleDelete={deleteTask}
          handleComplete={completeTask}
          editTask={editTask}
          setEditTask={setEditTask}
          editInputValue={editInputValue}
          setEditInputValue={setEditInputValue}
          handleEdit={editingTask}
        />
      ) : (
        <FilteredList
          handleDelete={deleteTask}
          handleComplete={completeTask}
          tasks={tasks}
          filter={filteredInputValue}
          editTask={editTask}
          setEditTask={setEditTask}
          editInputValue={editInputValue}
          setEditInputValue={setEditInputValue}
          handleEdit={editingTask}
        />
      )}
    </div>
  );
}

export default TodoForm;
