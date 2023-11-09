import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assets/css/style.css";

const tasks = [
    {
        id: "todo-1",
        name: "Eat",
        completed: true,
    },
    {
        id: "todo-2",
        name: "Sleep",
        completed: false,
    },
    {
        id: "todo-3",
        name: "Repeat",
        completed: false,
    },
];

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App tasks={tasks} />
    </React.StrictMode>
);
