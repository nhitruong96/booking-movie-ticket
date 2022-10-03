import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    // state application
});

export const store = createStore(rootReducer, applyMiddleware(thunk));