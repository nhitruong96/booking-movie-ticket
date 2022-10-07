import { SET_THEATER_LIST } from "../actions/types/TheaterType";

const stateDefault = {
    arrTheater: []
}

export const TheaterManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_THEATER_LIST: {
            state.arrTheater = action.arrTheater;
            return { ...state };
        }
        
        default: return { ...state }
    }
}