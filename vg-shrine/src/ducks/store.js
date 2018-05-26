import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducer';

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT') {
        state = undefined
    }
    return reducer(state, action);
}

export default createStore(rootReducer, applyMiddleware(promiseMiddleware()));