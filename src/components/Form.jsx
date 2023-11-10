import React from "react";
import { useState } from "react";
export default function (props) {
    /*
        Form Component

        parameter:
            props: all properties passed on to <Form /> component
        returns: 
            template: form template to add new task
    */

    const [taskName, setTask] = useState(""); // initializing taskName to ""

    // function to handleChange on input field
    const handleChange = (event) => {
        let input = event.target.value; // user input value on input field
        setTask(input); // setting task state to recent user input value
    };

    // function to handleSubmit on add new task form submitted
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form from submission

        /*
            validating task field for blank
            validation success: addTask(taskName) 
        */
        taskName === "" ? alert("Field Required!!!") : props.addTask(taskName);
        setTask(""); // resetting task state to ""
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
                value={taskName} // setting default value to current task state
                onChange={handleChange}
                placeholder='Enter Your Task'
            />
            <button type='submit' className='btn btn__primary btn__lg'>
                Add
            </button>
        </form>
    );
}
