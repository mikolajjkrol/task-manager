export async function fetchData(){
    const response = await fetch('http://192.168.33.11:3000/tasks');
    const resData = await response.json();
    
    if(!response.ok){
        throw new Error('Failed to fetch data.')
    }

    return resData.tasks
}

export async function updateData(data) {
    const response = await fetch('http://192.168.33.11:3000/tasks',{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    
    if(!response.ok){
        throw new Error('Failed to upload data.')
    }

    return resData.message;
}