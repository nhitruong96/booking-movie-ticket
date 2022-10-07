import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { FilmManagementReducer } from './reducers/FilmManagementReducer';
import { TheaterManagementReducer } from './reducers/TheaterManagementReducer';

const rootReducer = combineReducers({
    // state application
    CarouselReducer, // CarouselReducer: CarouselReducer
    FilmManagementReducer,
    TheaterManagementReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));