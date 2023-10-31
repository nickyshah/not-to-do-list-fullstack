import axios from 'axios'


const apiEp = "http://localhost:8000/api/v1/task/" 
export const postData = async(obj) => {
    try {

        const {data} = await axios.post(apiEp, obj)
        // console.log(response)
        return data;
        
    } catch (error) {
        console.log(error)
    }
}



export const getAllTask = async () => {
    try {
        const {data} = await axios.get(apiEp)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const updateTask = async (obj) => {
    try {
        const {data} = await axios.patch(apiEp, obj)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const deleteTasks = async (taskArg) => {
    try {
        const {data} = await axios.delete(apiEp, {data: taskArg})
        return data;
    } catch (error) {
        console.log(error)
    }
}