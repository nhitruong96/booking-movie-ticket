import { baseService } from "./baseService";
import { BookTicketInfo } from "../_core/models/BookTicketInfo";

export class BookingManagementService extends baseService {
    constructor() {
        super();
    }

    getTicketRoomDetail = (scheduleCode) => { // {scheduleCode from url}
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${scheduleCode}`)
    }

    bookTicket = (bookTicketInfo = new BookTicketInfo()) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, bookTicketInfo)
    }

    createShowtime = (showtimeInfo) => {
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`, showtimeInfo)
    }

}

export const bookingMngService = new BookingManagementService();