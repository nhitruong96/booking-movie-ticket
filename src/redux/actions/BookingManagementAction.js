import { connection } from "../..";
import { bookingMngService } from "../../services/BookingManagementService";
import { BookTicketInfo } from "../../_core/models/BookTicketInfo";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { BOOK_TICKET, COMPLETE_BOOK_TICKET, MOVE_TAB_AFTER_BOOKING, SET_TICKET_ROOM_DETAIL } from "./types/BookingManagementType";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType";

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

export const bookTicketAction = (bookTicketInfo = new BookTicketInfo()) => {

    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type:DISPLAY_LOADING
            // })
            dispatch(displayLoadingAction);

            const result = await bookingMngService.bookTicket(bookTicketInfo);
            console.log(result.data.content);
            //Book ticket successfully => call API to reload seats
            await dispatch(getTicketRoomDetailAction(bookTicketInfo.maLichChieu));
            await dispatch({ type: COMPLETE_BOOK_TICKET }); //Total payment go back to $0, seats color change from select to bookedByMe

            await dispatch(hideLoadingAction);

            let userLogin = getState().UserManagementReducer.userLogin;
            connection.invoke('datGheThanhCong', userLogin.taiKhoan, bookTicketInfo.maLichChieu);

            dispatch({ type: MOVE_TAB_AFTER_BOOKING });

        } catch (error) {
            dispatch(hideLoadingAction());

            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const bookSeatAction = (seat, maLichChieu) => {

    return async (dispatch, getState) => {

        //Send seat info to reducer
        await dispatch({
            type: BOOK_TICKET,
            seatSelected: seat
        });

        //Call API to backend
        let seatBookingList = getState().BookingManagementReducer.seatBookingList;
        let account = getState().UserManagementReducer.userLogin.taiKhoan;
 
        console.log('seatBookingList', seatBookingList);
        console.log('account', account);
        console.log('maLichChieu', maLichChieu);

        //Change array to string
        seatBookingList = JSON.stringify(seatBookingList);

        //Call API signalR
        connection.invoke('datGhe', account, seatBookingList, maLichChieu);
    }
}