import { useRef, useState, useEffect } from "react"
import { fetchData, updateData } from './scripts/http.js';
import Lenis from '@studio-freight/lenis';

export default function SearchTasks(){
    const [ actualTasks, setActualTasks ] = useState([]);
    const [ searchedTasks, setSearchedTasks ] = useState([]); 

    useEffect(() => {
        async function fetchTasks(){
          const tasksData = await fetchData();
          setActualTasks(tasksData)
        }
        fetchTasks();
      },[]);

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: document.querySelector('.searched'),
            content: document.querySelector('.searched'),
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
    }, [searchedTasks])

    const phrase = useRef()
    const type = useRef();

    function handleSearch(){
        if(type.current.value == 'waiting'){
            console.log('checking waiting tasks!')
            
            let newList = []
            
            actualTasks.forEach(task => {
                if(!task.isChecked){
                    newList.push(task)
                }                
            });

            setSearchedTasks(newList)
        } else if(type.current.value == 'done'){
            console.log('checking checked tasks!')
            
            let newList = []
            
            actualTasks.forEach(task => {
                if(task.isChecked){
                    newList.push(task)
                }                
            });

            setSearchedTasks(newList)
        } else if (type.current.value == 'late'){
            console.log('checking late tasks!')
            
            let newList = []
            
            actualTasks.forEach(task => {
                if(task.isLate){
                    newList.push(task)
                }                
            });

            setSearchedTasks(newList)
        } else if (type.current.value == 'person'){
            console.log('checking person tasks!')

            let newList = []
            
            actualTasks.forEach(task => {
                if(phrase.current.value && task.who?.toLowerCase()?.includes(phrase.current.value.toLowerCase())){
                    newList.push(task)
                } else if(!phrase.current.value && task.who){
                    newList.push(task)
                }
            });

            setSearchedTasks(newList)
        }
    }

    return(
        <>
        <div className='header'>Search tasks</div>
        <div className='search-tasks'>
            <input type='text' placeholder='search' ref={phrase} />
            <select ref={type}>
                <option>waiting</option>
                <option>done</option>
                <option>late</option>
                <option>person</option>
                <option>date</option>
            </select>
            <button className='material-icons' translate="no" onClick={handleSearch}>search</button>
        </div>
        <div className="search-container">
            <div className='searched'>
                {searchedTasks.length === 0 && 
                    <div className='no-search'>
                        <i>Nothing in here...</i>
                        <div className="material-icons" translate="no">search</div>
                    </div>
                }
                {
                    searchedTasks.map((task, index)=>{
                        return <div className="searched-task" key={index}>
                                <div className="task-text">
                                    <b>{task.title}</b>
                                    <p>{task.description}</p>
                                    <div className="time">
                                        <i>{task.date} {task.time}</i> <i>{task.who&&'~'}{task.who}</i>
                                    </div>
                            </div>
                            <button  translate="no" className='material-icons'>delete</button>
                            </div>
                    })
                }
            </div>
        </div>
        </>
    )
}