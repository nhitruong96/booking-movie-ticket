import { bookingMngService } from "../../services/BookingManagementService";
import { SET_TICKET_ROOM_DETAIL } from "./types/BookingManagementType";

export const getTicketRoomDetailAction = (scheduleCode) => {

    return async (dispatch) => {
        try {
            const result = await bookingMngService.getTicketRoomDetail(scheduleCode);

            console.log('resultTicketRoomDetail', result);

            if (result.status === 200) {
                dispatch({
                    type: SET_TICKET_ROOM_DETAIL,
                    ticketRoomDetail: result.data.content
                })
            }
        }
        catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}