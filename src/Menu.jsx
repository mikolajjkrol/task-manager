import { useState } from "react";

export default function Menu({ createTask, viewTasks }) {
    const [active, setActive] = useState("menu");

    const buttons = [
        { id: "menu", action: viewTasks },
        { id: "create", action: createTask },
        { id: "search", action: createTask },
        { id: "note", action: createTask }
    ];

    return (
        <div className="menu">
            {buttons.map(({ id, action }) => (
                <button
                    key={id}
                    translate="no"
                    className={`material-icons ${active === id ? "buttonactive" : "btn"}`}
                    onClick={() => {
                        action();
                        setActive(id);
                    }}
                >
                    {id}
                </button>
            ))}
        </div>
    );
}