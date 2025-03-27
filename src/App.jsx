import { useState, useReducer, useRef, useEffect } from 'react'
import { fetchData, updateData } from './scripts/http.js';

import CreateTask from './CreateTask.jsx'
import Tasks from './Tasks.jsx'
import Menu from './Menu.jsx';
import Alerts from './Alerts.jsx';

import { TasksManagerContext } from './store/tasks-manager-context.jsx';

function App() {
  const [ page, setPage ] = useState('menu');
  const [ tasks, setTasks ] = useState([]);
  const [ darkTheme, setDarkTheme ] = useState(true)
  const [ showAlert, setShowAlert ] = useState({onAdd: false, onDelete: false, onNoInfo: false});

  const timeoutRef = useRef(null);

  useEffect(() => {
    async function fetchTasks(){
      const tasksData = await fetchData();
      setTasks(tasksData)
    }
    fetchTasks();
  },[])

  const handlePageChange = (name) => {
    setPage(name)
  }

  const addTask = async (task) => {
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current);
      setShowAlert((prev) => ({ ...prev, onAdd: false, onNoInfo: false, onDelete: false }));
    }
    if(task.title == '' && task.description == ''){
      setShowAlert(prev=>{
        return {...prev, onNoInfo: true}
      })
      timeoutRef.current = setTimeout(() => {
        setShowAlert(prev=>{return {...prev, onNoInfo: false}});
      }, 2500);
    } else {
      setShowAlert(prev=>{return {...prev, onAdd: true}})
      timeoutRef.current = setTimeout(() => {
        setShowAlert(prev=>{return {...prev, onAdd: false}});
      }, 2500); // Hide alert after 3 seconds
      
      setTasks((prevTasks)=>{
        if(prevTasks.length > 0 && prevTasks[prevTasks.length-1].isChecked == true){
          checkIfLate([task, ...prevTasks]);
          return [task, ...prevTasks];
        } else {
          checkIfLate([...prevTasks, task]);
          return [...prevTasks, task];
        }
      })
      
      if(tasks.length > 0 && tasks[tasks.length-1].isChecked == true){
        await updateData([task,...tasks]);
      } else {
        await updateData([...tasks, task]);
      }
      
    }
  }

  const removeTask = async (taskIndex) => {
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current)
      setShowAlert((prev) => ({ ...prev, onAdd: false, onNoInfo: false, onDelete: false}));
    }

    setShowAlert(prev=>{
      return {...prev, onDelete: true}
    })
    timeoutRef.current = setTimeout(() => {
    setShowAlert(prev=>{
      return {...prev, onDelete: false}
    });
  }, 2500); // Hide alert after 3 seconds

    setTasks(prevTasks => {
      const newTasks = prevTasks.filter((_, index) => index !== taskIndex);
      return newTasks;
    })
    await updateData(tasks.filter((_, index) => index !== taskIndex));
  }

  const checkTask = async (index) => {
    setTasks((prevArr) => {
      if(!prevArr[index].isChecked){
      const newArr = [...prevArr]
      newArr[index] = {...newArr[index], isChecked: !newArr[index].isChecked}
      const [movedTask] = newArr.splice(index, 1);
      newArr.push(movedTask)
      return newArr
    } else {
      const newArr = [...prevArr];
      newArr[index] = {...newArr[index], isChecked: !newArr[index].isChecked}
      return newArr
    }})
    if(tasks[index].isChecked){
      const newArr = [...tasks]
      newArr[index] = {...newArr[index], isChecked: !newArr[index].isChecked}
      const [movedTask] = newArr.splice(index, 1);
      newArr.push(movedTask)
      await updateData(newArr);
    } else {
      const newArr = [...tasks]
      newArr[index] = {...newArr[index], isChecked: !newArr[index].isChecked}
      await updateData(newArr);
    }
    
  }

  const handleAlerts = (action) => {
    setShowAlert(prev => {
      return {...prev, ...action}
    })
  }

  function checkIfLate(array){
    const notFormattedTime = new Date();
    const actualTime = `${String(notFormattedTime.getHours()).padStart(2, '0')}:${String(notFormattedTime.getMinutes()).padStart(2, '0')}`;
    const notFormattedDate = new Date();
    const actualDate = `${notFormattedDate.getFullYear()}-${String(notFormattedDate.getMonth() + 1).padStart(2, '0')}-${String(notFormattedDate.getDate()).padStart(2, '0')}`;

    if (array.length > 0){
      array.forEach((task, index) => {
        if(task.date.trim() === actualDate.trim()) {
        }
        if ((task.date != '' && task.time != '' &&  task.date < actualDate ||  (task.date == actualDate && task.time < actualTime  && task.time != '')) || ((task.date != '' && task.date < actualDate) || (task.time != '' && task.time < actualTime && task.date == ''))){
          setTasks(prevTasks=>{
            const newArr = [...prevTasks]
            newArr[index] = {...newArr[index], isLate: true}
            return newArr
          })
        } else {
          setTasks(prevTasks=>{
            const newArr = [...prevTasks]
            newArr[index] = {...newArr[index], isLate: false}
            return newArr
          })
        }
    });
    }
  }

  const tasksCtx = {
    tasks: tasks,
    addTask,
    removeTask,
    checkTask,
    handlePageChange,
    showAlert,
    handleAlerts,
  }

  return (
    <TasksManagerContext.Provider value={tasksCtx}>
    
    <Alerts />
    
    <main className={darkTheme ? 'dark-theme' : 'light-theme'}>
      <div className='main'>
        <Menu/>        
        <div className='container'>
          {page === 'menu' && <Tasks/>}
          {page === 'create' && <CreateTask/>}
        </div>
      </div>
    </main>
  
    <div className={`switch material-icons ${!darkTheme ? 'sun' : 'moon'}`} translate="no" style={darkTheme ? {color: '#dedede'} : {color: '#1f1f1f'}} onClick={()=>setDarkTheme(prev => !prev)}>{!darkTheme ? 'light_mode' : 'dark_mode'}</div>
    </TasksManagerContext.Provider>
  )
}

export default App