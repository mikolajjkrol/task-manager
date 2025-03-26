import { useState, useContext } from "react";
import { TasksManagerContext } from "./store/tasks-manager-context";

export default function Menu() {
    const [active, setActive] = useState("menu");
    const { handlePageChange } = useContext(TasksManagerContext)
    const buttons = [
        { id: "menu"},
        { id: "create"},
        { id: "search"},
        { id: "note"}
    ];

    return (
        <div className="menu">
            {buttons.map(({ id }) => (
                <button
                    key={id}
                    translate="no"
                    className={`material-icons ${active === id ? "buttonactive" : "btn"}`}
                    onClick={() => {
                        handlePageChange(id);
                        setActive(id);
                    }}
                >
                    {id}
                </button>
            ))}
        </div>
    );
}