import React from "react";
export default function (props) {
    const taskCount = props.tasks.filter(
        props.filterMap[props.filterName]
    ).length;
    const taskNoun = taskCount > 1 ? "tasks" : "task";
    let taskCategory = props.filterName === "Active" ? "active" : "completed";
    taskCategory = props.filterName === "All" ? "" : taskCategory;
    return (
        <h2 id='list-heading'>
            {taskCount} {taskNoun} {taskCategory}
        </h2>
    );
}
