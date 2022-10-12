import { BOOK_TICKET, SET_TICKET_ROOM_DETAIL } from "../actions/types/BookingManagementType";
import { TicketRoomDetail } from "../../_core/models/TicketRoomDetail";

const stateDefault = {
    ticketRoomDetail: new TicketRoomDetail(),
    seatBookingList: [{ giaVe: 75000, loaiGhe: "Thuong", maGhe: 47450, maRap: 451, stt: "50", tenGhe: "50" }]
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
            return { ...state, seatBookingList: updateSeatBookingList }
        }


        default: return { ...state }
    }
}