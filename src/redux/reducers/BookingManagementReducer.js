import { SET_TICKET_ROOM_DETAIL } from "../actions/types/BookingManagementType";
import { TicketRoomDetail } from "../../_core/models/TicketRoomDetail";

const stateDefault = {
    ticketRoomDetail: new TicketRoomDetail()
}

export const BookingManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_TICKET_ROOM_DETAIL:
            state.ticketRoomDetail = action.ticketRoomDetail;
            return { ...state };

        default: return { ...state }
    }
}