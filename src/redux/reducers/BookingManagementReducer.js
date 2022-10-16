import { BOOK_TICKET, COMPLETE_BOOK_TICKET, MOVE_TAB_AFTER_BOOKING, SET_TICKET_ROOM_DETAIL } from "../actions/types/BookingManagementType";
import { TicketRoomDetail } from "../../_core/models/TicketRoomDetail";

const stateDefault = {
    ticketRoomDetail: new TicketRoomDetail(),
    seatBookingList: [], //list of seats are currently booking
    seatBookingByOthersList: [{maGhe:47401},{maGhe:47402}],
    tabActive: "1"
}

export const BookingManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_TICKET_ROOM_DETAIL: {
            state.ticketRoomDetail = action.ticketRoomDetail;
            return { ...state };
        }

        case BOOK_TICKET: {
            // console.log(action);

            //Update list of seats currently booking
            let updateSeatBookingList = [...state.seatBookingList];

            let index = updateSeatBookingList.findIndex(seatBooking => seatBooking.maGhe === action.seatSelected.maGhe);
            if (index !== -1) {
                //If a seat is found in the list meaning it was selected before => unselect it (by removing it)
                updateSeatBookingList.splice(index, 1);
            } else {
                updateSeatBookingList.push(action.seatSelected);
            }
            return { ...state, seatBookingList: updateSeatBookingList };
        }

        case COMPLETE_BOOK_TICKET: {
            state.seatBookingList = []; //Reset to empty list after clicked Book ticket
            return { ...state };
        }

        case MOVE_TAB_AFTER_BOOKING: {
            state.tabActive = "2";
            return { ...state };
        }

        case 'CHANGE_TAB_ACTIVE': {
            state.tabActive = action.tabActive;
            return { ...state };
        }

        default: return { ...state }
    }
}