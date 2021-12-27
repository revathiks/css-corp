import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import TodoReducer from './Reducers/todoReducer';

const reducers = combineReducers(
    {
        todo: TodoReducer,

    }
);
const initialState = {};
const middleware = [thunk];
const Store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default Store;