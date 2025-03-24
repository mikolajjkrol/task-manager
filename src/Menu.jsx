import { useState } from "react"
export default function Menu({createTask, viewTasks}) {
    const [ activate , setActivate ] = useState('menu');

    function activateBtn(which){
        if(which == 'menu'){ 
            viewTasks();
            setActivate('menu');
        } else if(which == 'create'){ 
            createTask();
            setActivate('create');
        } else if (which == 'search'){ 
            createTask();
            setActivate('search');
        } else if (which == 'note'){ 
            createTask();
            setActivate('note');
        }

    }

    return (
        <div className='menu'>
            <button className={activate == 'menu' ? "material-icons buttonactive" : "material-icons btn"} onClick={()=>{activateBtn('menu')}}>menu</button>
            <button className={activate == 'create' ? 'buttonactive material-icons' : 'material-icons btn'} onClick={()=>{activateBtn('create')}}>add</button>
            <button className={activate == 'search' ? "material-icons buttonactive" : "material-icons btn"} onClick={()=>{activateBtn('search')}}>search</button>
            <button className={activate == 'note' ? "material-icons buttonactive" : "material-icons btn"} onClick={()=>{activateBtn('note')}} >note</button>
        </div>
    )
}