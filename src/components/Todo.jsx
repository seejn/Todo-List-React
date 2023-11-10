import React from "react";
import { useState } from "react";

export default function (props) {
    // initializing isEditing state to false
    const [isEditing, setEditing] = useState(false);

    // initializing newName state to passed on name
    const [newName, setName] = useState(props.name);

    // function to handle change in edit form's input field
    const handleChange = (event) => {
        let value = event.target.value; // user input value
        setName(value); // setting name state to recent user input
    };

    // function to handle edit form's submit event
    const handleSubmit = (event) => {
        event.preventDefault(); // preventing form from submission
        props.editTask(props.id, newName); // passing id and newName of task to editTask
        setEditing(false); // resetting isEditing state to false
    };
    const editTemplate = (
        <form className='stack-small' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='todo-label' htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className='todo-text'
                    type='text'
                    value={newName}
                    onChange={handleChange}
                />
            </div>
            <div className='btn-group'>
                <button
                    type='button'
                    className='btn todo-cancel'
                    // onClick setting isEditing state false
                    // displays todoListTemplate
                    onClick={() => setEditing(false)}>
                    Cancel
                    <span className='visually-hidden'>
                        renaming {props.name}
                    </span>
                </button>
                <button type='submit' className='btn btn__primary todo-edit'>
                    Save
                    <span className='visually-hidden'>
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );

    const todoListTemplate = (
        <div className='todo'>
            <div className='c-cb'>
                <input
                    id={props.id}
                    type='checkbox'
                    defaultChecked={props.checked}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className='todo-label' htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className='btn-group'>
                <button
                    type='button'
                    className='btn'
                    // onClick setting isEditing state to true
                    // displays editingTemplate
                    onClick={() => setEditing(true)}>
                    Edit <span className='visually-hidden'>{props.name}</span>
                </button>
                <button
                    type='button'
                    className='btn btn__danger'
                    // onClick pass task's id to deleteTask
                    // deletes this task
                    onClick={() => props.deleteTask(props.id)}>
                    Delete <span className='visually-hidden'>{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className='stack-small'>
            {/* returns editTemplate if isEditing state ture else returns todoListTemplate */}
            {isEditing ? editTemplate : todoListTemplate}
        </li>
    );
}
