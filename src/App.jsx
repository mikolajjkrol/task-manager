import { useState, useReducer, useRef } from 'react'
import CreateTask from './CreateTask.jsx'
import Tasks from './Tasks.jsx'
import Menu from './Menu.jsx';
import { TasksManagerContext } from './store/tasks-manager-context.jsx';
import Alert from '@mui/material/Alert';

function App() {
  const [ page, setPage ] = useState('tasks');
  const [ tasks, setTasks ] = useState([]);
  const [ darkTheme, setDarkTheme ] = useState(true)
  const [ showAlert, setShowAlert ] = useState({onAdd: false, onDelete: false, onNoInfo: false});
  
  const timeoutRef = useRef(null);

  const addTask = (task) => {
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
          return [task, ...prevTasks]
        } else {
          return [...prevTasks, task];
        }
      })
    }    
  }

  const removeTask = (taskIndex) => {
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
  }

  const checkTask = (index) => {
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
    }
  })
  }

  return (
    <TasksManagerContext.Provider value={tasks}>
    
    {showAlert.onAdd && <Alert variant="filled" severity="success" className='alert' sx={{ bgcolor: '#005100af' }} onClose={()=>{setShowAlert(prev=>{return {...prev, onAdd: false}})}}>Succesfully added a task.</Alert>}
    {showAlert.onDelete && <Alert variant="filled" severity="error" className='alert'  sx={{ bgcolor: '#d81010b9' }} onClose={()=>{setShowAlert(prev=>{return {...prev, onDelete: false}})}} icon={<div className='material-icons' style={{fontSize: '22px',}}>delete_forever</div>}>Succesfully removed task.</Alert>}
    {showAlert.onNoInfo && <Alert variant="filled" severity="warning" className='alert' sx={{ bgcolor: '#deb41bd9' }} onClose={()=>{setShowAlert(prev=>{return {...prev, onNoInfo: false}})}}>Not enough information.</Alert>}

    <main className={darkTheme ? 'dark-theme' : 'light-theme'}>
      <div className='main'>
        <Menu createTask={()=>setPage('create-task')} viewTasks={()=>setPage('tasks')}/>        
        <div className='container'>
          {page === 'create-task' && <CreateTask addTask={addTask}/>}
          {page === 'tasks' && <Tasks removeTask={removeTask} onCheck={checkTask}/>}
        </div>
      </div>
    </main>
  
    <div className={`switch material-icons ${!darkTheme ? 'sun' : 'moon'}`} translate="no" style={darkTheme ? {color: '#dedede'} : {color: '#1f1f1f'}} onClick={()=>setDarkTheme(prev => !prev)}>{!darkTheme ? 'light_mode' : 'dark_mode'}</div>
    </TasksManagerContext.Provider>
  )
}

export default App
