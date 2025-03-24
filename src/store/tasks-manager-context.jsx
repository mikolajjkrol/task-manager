import { createContext } from "react";

export const TasksManagerContext = createContext([
    {
        title: '',
        description: '',
        date: '',
        time: '',
        who: '',
        isChecked: false,
    },
]);