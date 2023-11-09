import React from "react";
import { useState } from "react";
export default function (props) {
    const [taskName, setTask] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        taskName === "" ? alert("Field Required!!!") : props.addTask(taskName);
        setTask("");
    };

    const handleChange = (event) => {
        let input = event.target.value;
        setTask(input);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2 className='label-wrapper'>
                <label htmlFor='new-todo-input' className='label__lg'>
                    What needs to be done?
                </label>
            </h2>
            <input
                type='text'
                id='new-todo-input'
                className='input input__lg'
                name='text'
                autoComplete='off'
                value={taskName}
                onChange={handleChange}
                placeholder='Enter Your Task'
            />
            <button type='submit' className='btn btn__primary btn__lg'>
                Add
            </button>
        </form>
    );
}
