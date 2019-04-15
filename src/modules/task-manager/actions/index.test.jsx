import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import Axios from 'axios';
import tasksReducer from './../reducers/tasksReducer';

import { FETCH_TASKS, CREATE_TASK } from "./types";
import { fetchTasks, createTask } from "./index";

const mockStore = configureMockStore([thunk, promiseMiddleware]);

describe("TaskManager Actions", () => {
    var store;

    beforeEach(() => {
       store = mockStore({
            tasksReducer: tasksReducer(undefined, {})
       });
    });

    it('should fetch all tasks', async () => {
        Axios.get.mockImplementationOnce(() => (Promise.resolve({
            data: [
                { "description": "Realizar compra da TV 1", "checked": false },
                { "description": "Realizar compra da TV 2", "checked": false }
            ]
        })));

        await store.dispatch(fetchTasks());

        const actions = store.getActions();

        expect(actions[0].type).toEqual(`${FETCH_TASKS}_PENDING`);
        expect(actions[1].type).toEqual(`${FETCH_TASKS}_FULFILLED`);
        expect(actions[1].payload).toEqual({
            data: [
                { "description": "Realizar compra da TV 1", "checked": false },
                { "description": "Realizar compra da TV 2", "checked": false }
            ]
        });
     });

     
     it('should create one task', async () => {
        Axios.post.mockImplementationOnce(() => (Promise.resolve({
            data: { "description": "Realizar compra da TV 1", "checked": false }
        })));

        await store.dispatch(createTask());

        const actions = store.getActions();

        expect(actions[0].type).toEqual(`${CREATE_TASK}_PENDING`);
        expect(actions[1].type).toEqual(`${CREATE_TASK}_FULFILLED`);
        expect(actions[1].payload).toEqual({
            data: { "description": "Realizar compra da TV 1", "checked": false }
        });

     });
});

describe('TaskManager Reducer', () => {

    it('should change the state "loading" for true when create one task', () => {
        const reducer = tasksReducer(undefined, { type: `${CREATE_TASK}_PENDING`});
        expect(reducer).toEqual({
            tasks: [],
            loading: true
        });
    });

    
    it('should receive new taks on state tasks', () => {
        const reducer = tasksReducer(undefined, { 
            type: `${CREATE_TASK}_FULFILLED`, 
            payload: { 
                "description": "Realizar compra da TV 4", "checked": false 
            }
        });

        expect(reducer).toEqual({
            tasks: [
                { "description": "Realizar compra da TV 4", "checked": false  }
            ],
            loading: false
        })
    });

    it('should change the state "loading" for true when fetch the tasks', () => {
        const reducer = tasksReducer({
            tasks: [],
            loading: false
        }, { type: `${FETCH_TASKS}_PENDING`});
        expect(reducer).toEqual({
            tasks: [],
            loading: true
        });
    });

    it('should receive tasks', () => {
        const payload = [
            { "description": "Realizar compra da TV 1", "checked": false },
            { "description": "Realizar compra da TV 2", "checked": false },
            { "description": "Realizar compra da TV 3", "checked": false }
        ];

        const reducer = tasksReducer({
            tasks: [],
            loading: false
        }, { type: `${FETCH_TASKS}_FULFILLED`, payload});

        expect(reducer).toEqual({
            tasks: payload,
            loading: false
        });

    })
});