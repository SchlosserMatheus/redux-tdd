
const initialState = {
    tasks: [],
    loading: false
};

export default function tasksReducer(_state = initialState, action) 
{
    const state = {..._state};

    switch(action.type)
    {
        case 'FETCH_TASKS_FULFILLED':
            state.tasks = action.payload;
            return state;

        case 'CREATE_TASK_FULFILLED':
            state.tasks.push(action.payload);
            return state;

        case 'FETCH_TASKS_PENDING':
            state.loading = true;
            return state;

        case 'CREATE_TASK_PENDING':
            state.loading = true;
            return state;

        default:
            return state;
    }
}