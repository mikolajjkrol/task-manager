import { useRef } from "react"
export default function CreateTask({addTask}) {
    const title = useRef()
    const description = useRef()
    const dueDate = useRef()
    const dueTime = useRef()
    const person = useRef()

    function getInfo() {
        const task = {
            title: title.current.value,
            description: description.current.value,
            date: dueDate.current.value,
            time: dueTime.current.value,
            who: person.current.value,
            isChecked: false,
        }

        addTask(task)
        
        if(task.title == '' && task.description == ''){
           return 
        } else {
            title.current.value = ''
        description.current.value = ''
        dueDate.current.value = ''
        dueTime.current.value = ''
        person.current.value = ''

        }
    }
    return (
        <>
        <div className='header'>Create a task</div>
        <div className='create-task'>
            <div className="info">
            <input type='text' id='title' placeholder='title' ref={title}/>
            <input type='text' id='description' placeholder='description' ref={description}/>
            <input type='date' id='due-date' ref={dueDate}/>
            <input type='time' id='due-time' ref={dueTime}/>
            <input type='text' id='person' placeholder='person' ref={person}/>   
            <div id="btn" onClick={getInfo}>+</div>
            </div>
        </div>
        </>
    )
}