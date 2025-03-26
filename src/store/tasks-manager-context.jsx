import { createContext, useState } from "react";

export const TasksManagerContext = createContext([
    {
        title: '',
        description: '',
        date: '',
        time: '',
        who: '',
        isChecked: false,
        isLate: false,
        addTask: ()=>{},
        removeTask: ()=>{},
        checkTask: ()=>{},
        handlePageChange: ()=>{},
        showAlert: {},
        handleAlerts: ()=>{},
    },
]);