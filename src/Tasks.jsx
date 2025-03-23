import { TasksManagerContext } from "./store/tasks-manager-context"
import { useContext } from "react"

export default function Tasks({removeTask}) {
    const tasksList = useContext(TasksManagerContext)

    return (
        <>
        
        <div className='header'>Tasks</div>
        <div className="tasks-container">
            <div className='tasks'>
            {tasksList.length === 0 && 
                <div className='no-tasks'>
                    <i>No tasks for the moment...</i>
                    <div className="material-icons">search</div>
                </div>
            }
            {   
            tasksList.map((task) => {
                    return (
                        <div className='task' key={tasksList.indexOf(task)}>
                            <input type='checkbox' id={tasksList.indexOf(task)} className="custom"/>
                            <label htmlFor={tasksList.indexOf(task)}>
                                <div className="task-text">
                                    <b>{task.title}</b>
                                    <p>{task.description}</p>
                                    <div className="time">
                                        <i>{task.date} {task.time}</i> <i>{task.who&&'~'}{task.who}</i>
                                    </div>
                            </div>
                            </label>
                            <button className='material-icons' onClick={()=>removeTask(tasksList.indexOf(task))}>delete</button>
                        </div>
                        )})
            }
            </div>
        </div>
        
        </>
    )
}