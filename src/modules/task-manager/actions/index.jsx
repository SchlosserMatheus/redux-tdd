import { FETCH_TASKS, CREATE_TASK } from "./types";
import TaskService from "../services/TaskService";


export const fetchTasks = () => dispatch => dispatch({ type: FETCH_TASKS, payload: TaskService.getAll() });

export const createTask = payload => dispatch => dispatch({ type: CREATE_TASK, payload: TaskService.create(payload) });