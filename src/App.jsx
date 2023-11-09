import React from "react";
import Todo from "./components/Todo.jsx";
import Heading from "./components/Heading.jsx";
import FilterButton from "./components/FilterButton.jsx";
import Form from "./components/Form.jsx";

import { useState } from "react";
import { nanoid } from "nanoid";

export default function (props) {
    const [tasks, setTask] = useState(props.tasks);
    const [filter, setFilter] = useState("All");

    const FILTER_MAP = {
        All: () => true,
        Completed: (task) => task.completed,
        Active: (task) => !task.completed,
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const addTask = (name) => {
        let task = {
            id: `todo-${nanoid()}`,
            name: name,
            completed: false,
        };
        const updatedTask = [...tasks, task];
        setTask(updatedTask);
    };

    const editTask = (id, newName) => {
        let updatedTask = tasks?.map((task) => {
            if (task.id === id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTask(updatedTask);
    };

    const deleteTask = (id) => {
        setTask(tasks?.filter((task) => task.id !== id));
    };

    const toggleTaskCompleted = (id) => {
        const updatedTask = tasks?.map((task) => {
            if (task.id === id) {
                // returns new object where the task object is spread to new object
                // and completed is updated with the inverted value
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTask(updatedTask);
    };

    const filterList = FILTER_NAMES?.map((name, index) => (
        <FilterButton
            key={index}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const todoList = tasks?.filter(FILTER_MAP[filter]).map((task, index) => {
        return (
            <Todo
                key={index}
                id={task.id}
                name={task.name}
                checked={task.completed}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        );
    });

    return (
        <div className='todoapp stack-large'>
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className='filters btn-group stack-exception'>
                {filterList}
            </div>
            <Heading tasks={tasks} filterMap={FILTER_MAP} filterName={filter} />
            <ul
                role='list'
                className='todo-list stack-large stack-exception'
                aria-labelledby='list-heading'>
                {todoList}
            </ul>
        </div>
    );
}
