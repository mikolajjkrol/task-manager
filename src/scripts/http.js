export async function fetchData(){
    const response = await fetch('http://localhost:3000/tasks');
    const resData = await response.json();
    
    if(!response.ok){
        throw new Error('Failed to fetch data.')
    }

    return resData.tasks
}

export async function addData(data) {

}