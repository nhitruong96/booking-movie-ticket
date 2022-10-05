import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { FilmManagementReducer } from './reducers/FilmManagementReducer';


const rootReducer = combineReducers({
    // state application
    CarouselReducer, // CarouselReducer: CarouselReducer
    FilmManagementReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));