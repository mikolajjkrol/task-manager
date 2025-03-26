import { useContext } from "react";
import { TasksManagerContext } from "./store/tasks-manager-context";
import Alert from '@mui/material/Alert';

export default function Alerts(){
    const { showAlert, handleAlerts } = useContext(TasksManagerContext)

    return (
        <>
        {showAlert.onAdd && <Alert variant="filled" severity="success" className='alert' sx={{ bgcolor: '#005100af' }} onClose={()=>{handleAlerts({onAdd: false})}}>Succesfully added a task.</Alert>}
        {showAlert.onDelete && <Alert variant="filled" severity="error" className='alert'  sx={{ bgcolor: '#d81010b9' }} onClose={()=>{handleAlerts({onDelete: false})}} icon={<div className='material-icons' style={{fontSize: '22px',}}>delete_forever</div>}>Succesfully removed task.</Alert>}
        {showAlert.onNoInfo && <Alert variant="filled" severity="warning" className='alert' sx={{ bgcolor: '#deb41bd9' }} onClose={()=>{handleAlerts({onNoInfo: false})}}>Not enough information.</Alert>}
        </>
    )
}
