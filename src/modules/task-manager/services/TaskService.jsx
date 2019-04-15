import Axios from "axios";

export default class TaskService
{
    static getAll()
    {
        return Axios.get('/api.json');
    }

    static create(task)
    {   
        return Axios.post('/create', task)
    }
}