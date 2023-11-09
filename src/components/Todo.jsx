import React from "react";
import { useState } from "react";

export default function (props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setName] = useState(props.name);

    const handleChange = (event) => {
        let value = event.target.value;
        setName(value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        props.editTask(props.id, newName);
        setName("");
        setEditing(false);
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
                    onClick={() => setEditing(true)}>
                    Edit <span className='visually-hidden'>{props.name}</span>
                </button>
                <button
                    type='button'
                    className='btn btn__danger'
                    onClick={() => props.deleteTask(props.id)}>
                    Delete <span className='visually-hidden'>{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className='stack-small'>
            {isEditing ? editTemplate : todoListTemplate}
        </li>
    );
}
