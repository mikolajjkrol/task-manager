import { TasksManagerContext } from "./store/tasks-manager-context"
import { useContext, useEffect } from "react"
import Lenis from '@studio-freight/lenis';

export default function Tasks() {
    const { tasks, checkTask, removeTask } = useContext(TasksManagerContext)        

    useEffect(()=>{
        const lenis = new Lenis({
            wrapper: document.querySelector('.tasks'),
            content: document.querySelector('.tasks'),
            smoothWheel: true,
            smoothTouch: true,
        });
        function raf(time){
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => {
            lenis.destroy(); // Cleanup when component unmounts
          };        
    }, [tasks])
    
    return (
        <>
        <div className='header'>Tasks</div>
        <div className="tasks-container">
            <div className='tasks'>
            {tasks.length === 0 && 
                <div className='no-tasks'>
                    <i>No tasks for the moment...</i>
                    <div className="material-icons" translate="no">search</div>
                </div>
            }
            {   
            tasks.map((task, index) => {
                    return (
                        <div className={`task ${task.isChecked ? 'oncheck' : ''}`} key={index}>
                            <input type='checkbox' id={index} className="custom" onChange={()=>{checkTask(index)}} checked={task.isChecked}/>
                            <label htmlFor={index}>
                                <div className="task-text">
                                    <b>{task.title}</b>
                                    <p>{task.description}</p>
                                    <div className="time">
                                        <i className={task.isLate ? 'late' : ''}>{task.date} {task.time}</i> <i>{task.who&&'~'}{task.who}</i>
                                    </div>
                            </div>
                            </label>
                            <button  translate="no" className='material-icons' onClick={()=>removeTask(index)}>delete</button>
                        </div>
                        )})
            }
            </div>
        </div>
        </>
    )
}