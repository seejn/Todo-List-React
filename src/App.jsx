import React from "react";
import Todo from "./components/Todo.jsx";
import Heading from "./components/Heading.jsx";
import FilterButton from "./components/FilterButton.jsx";
import Form from "./components/Form.jsx";

import { useState } from "react";
import { nanoid } from "nanoid"; // nanoid generates random IDS

export default function (props) {
    /*
        function to return whole Todo List App Component

        parameter:
            props: contains all properties passed on to this component

        returns:
            template: template of Todo List
    */

    // initializing values to display all tasks

    // initializing tasks to display
    const [tasks, setTask] = useState(props.tasks);

    // initializing filter to all
    const [filter, setFilter] = useState("All");

    // mapping filter functions
    const FILTER_MAP = {
        All: () => true,
        Completed: (task) => task.completed,
        Active: (task) => !task.completed,
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP); // storing keys of FILTER_MAP object

    const addTask = (name) => {
        /*
            function to add new task in task array
            
            parameter: 
                name: name of new task to add
        */
        let task = {
            id: `todo-${nanoid()}`, // setting id to unique with nanoid
            name: name,
            completed: false, // default state of completed to be false
        };

        const updatedTask = [...tasks, task]; // spread operator to update task array
        setTask(updatedTask); // setting task to updated one
    };

    const editTask = (id, newName) => {
        /*
            function to edit task
            
            parameters:
                id: id of task to edit
                newName: new name to update in current name

            returns:
                object: object of task with updated name
        */

        // mapping each task with condition if tasks is not null
        let updatedTask = tasks?.map((task) => {
            // checking id of task to edit, with each task
            if (task.id === id) {
                // if both id matches, task to edit found

                return { ...task, name: newName }; // use of spread operator
                // updating the name of task with new one
                /*
                    Equivalent to:
                        task["name"] = newName;
                        return task;
                */
            }
            return task; // if id does not match return as it is
        });
        setTask(updatedTask); // setting updated task to new one
    };

    const deleteTask = (id) => {
        /*
            function to delete task from current task array

            parameter: 
                id: id of task to delete
        */

        /*
            mapping each task with condition if tasks not null
            
            filter tasks, exclude the task matching the id
        */

        // sets the task excluding task to delete
        setTask(tasks?.filter((task) => task.id !== id));
        // if both id doesnot match, return
        // else donot returnn
    };

    const toggleTaskCompleted = (id) => {
        /*
            function to toggle mark the task active or completed
            
            parameter:
                id: id of task to toggle mark
        */

        // mapping each task with condition if tasks not null
        const updatedTask = tasks?.map((task) => {
            // checking id of the task with given id
            if (task.id === id) {
                // if both id matches

                // returns new object with inverted completed value
                // if true returns false
                // if false returns true
                return { ...task, completed: !task.completed }; // use of spread operator
                /*
                    Equivalent to:
                        task['completed']= !task['completed'];
                        return task;
                */
            }
            // in case IDS doesnot match
            return task; // returns task as it is
        });
        setTask(updatedTask); // setting task with updatedTask
    };

    // mapping <FilterButton /> with FILTER_NAMES with condition FILTER_NAMES not null
    const filterList = FILTER_NAMES?.map((name, index) => (
        <FilterButton
            key={index}
            name={name}
            // if name and filter state matches, pass true else, pass false
            isPressed={name === filter}
            setFilter={setFilter} // passing setFilter function to set filter state
        />
    ));

    // filter tasks with contidion tasks not null and FILTER_MAP function of current filter state
    /*
        if filter = 'All'
        FILTER_MAP[filter] refers to [ () => true ]
        meaning filters all task

        if filter = 'Completed'
        FILTER_MAP[filter] refers to [ (task) => task.completed ]
        meaning filters completed task

        if filter = 'Active'
        FILTER_MAP[filter] refers to [ (task) => !task.completed ]
        meaning filters active task
    */
    // mapping component <Todo /> with filtered tasks
    const todoList = tasks?.filter(FILTER_MAP[filter]).map((task, index) => {
        return (
            <Todo
                key={index}
                id={task.id}
                name={task.name}
                checked={task.completed}
                toggleTaskCompleted={toggleTaskCompleted} // passing toggleTaskCompleted function to toggle task
                deleteTask={deleteTask} // passing deleteTask function to delete task
                editTask={editTask} // passing editTask function to edit task
            />
        );
    });

    return (
        <div className='todoapp stack-large'>
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className='filters btn-group stack-exception'>
                {filterList} {/* has list of <FilterButton /> component */}
            </div>
            <Heading tasks={tasks} filterMap={FILTER_MAP} filterName={filter} />
            <ul
                role='list'
                className='todo-list stack-large stack-exception'
                aria-labelledby='list-heading'>
                {todoList} {/* has list of filtered <Todo /> component */}
            </ul>
        </div>
    );
}
