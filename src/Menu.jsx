export default function Menu({createTask, viewTasks}) {
    return (
        <div className='menu'>
            <button className='material-icons' onClick={viewTasks}>menu</button>
            <button onClick={createTask}>+</button>
            <button className="material-icons">search</button>
            <button className="material-icons">note</button>
        </div>
    )
}