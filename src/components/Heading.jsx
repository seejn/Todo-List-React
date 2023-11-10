import React from "react";
export default function (props) {
    /*
        Heading Component

        parameter: 
            props: all properties passed on to component
            props.filterMap: contains mapping functions
            props.filterName: contains name to filter state
        returns:
            template: template of heading
    */

    // count of number of task
    // filter task as per mapped filter function
    const taskCount = props.tasks.filter(
        // passing filter state to map the filter function
        props.filterMap[props.filterName]
    ).length;
    const taskNoun = taskCount > 1 ? "tasks" : "task"; // returns tasks if task count more than one
    let taskCategory = props.filterName === "Active" ? "active" : "completed";
    taskCategory = props.filterName === "All" ? "" : taskCategory;
    return (
        <h2 id='list-heading'>
            {taskCount} {taskNoun} {taskCategory}
        </h2>
    );
}
