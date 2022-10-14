import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { FilmManagementReducer } from './reducers/FilmManagementReducer';
import { TheaterManagementReducer } from './reducers/TheaterManagementReducer';
import { UserManagementReducer } from './reducers/UserManagementReducer';
import { BookingManagementReducer } from './reducers/BookingManagementReducer';
import { LoadingReducer } from './reducers/LoadingReducer';


const rootReducer = combineReducers({
    // state application
    CarouselReducer, // CarouselReducer: CarouselReducer
    FilmManagementReducer,
    TheaterManagementReducer,
    UserManagementReducer,
    BookingManagementReducer,
    LoadingReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));