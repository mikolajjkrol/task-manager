import { useState, useReducer } from 'react'
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
  
  const addTask = (task) => {
    if(task.title == '' && task.description == ''){
      setShowAlert(prev=>{return {...prev, onNoInfo: true}})
      setTimeout(() => {
        setShowAlert(prev=>{return {...prev, onNoInfo: false}});
      }, 3000);
    } else {
      setShowAlert(prev=>{return {...prev, onAdd: true}})
      setTimeout(() => {
        setShowAlert(prev=>{return {...prev, onAdd: false}});
      }, 3000); // Hide alert after 3 seconds
  
      setTasks((prevTasks)=>{
        const newTasks = [...prevTasks, task];
        console.log(newTasks)
        return newTasks;
      })
    }    
  }

  const removeTask = (taskIndex) => {
    setShowAlert(prev=>{
      return {...prev, onDelete: true}
    })
    setTimeout(() => {
      setShowAlert(prev=>{
        return {...prev, onDelete: false}
      });
    }, 3000); // Hide alert after 3 seconds

    setTasks(prevTasks => {
      const newTasks = prevTasks.filter((_, index) => index !== taskIndex);
      console.log(newTasks)
      return newTasks;
    })
  }

  return (
    <TasksManagerContext.Provider value={tasks}>
    
    {showAlert.onAdd && <Alert variant="filled" severity="success" className='alert'>Succesfully added a task to a list.</Alert>}
    {showAlert.onDelete && <Alert variant="filled" severity="error" className='alert'  icon={<div className='material-icons' style={{fontSize: '22px',}}>delete_forever</div>}>Succesfully removed task from a list.</Alert>}
    {showAlert.onNoInfo && <Alert variant="filled" severity="warning" className='alert'>There is no information in any of the fields.</Alert>}

    <main className={darkTheme ? 'dark-theme' : 'light-theme'}>
      <div className='main'>
        <Menu createTask={()=>setPage('create-task')} viewTasks={()=>setPage('tasks')}/>        
        <div className='container'>
          {page === 'create-task' && <CreateTask addTask={addTask}/>}
          {page === 'tasks' && <Tasks removeTask={removeTask} />}
        </div>
      </div>
    </main>
  
    <div className="switch material-icons" style={darkTheme ? {color: 'white'} : {color: 'black'}} onClick={()=>setDarkTheme(prev => !prev)}>{!darkTheme ? 'light_mode' : 'dark_mode'}</div>
    </TasksManagerContext.Provider>
  )
}

export default App
