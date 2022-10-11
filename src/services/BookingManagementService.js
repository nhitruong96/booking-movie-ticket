import { baseService } from "./baseService";

export class BookingManagementService extends baseService {
    constructor() {
        super();
    }

    getTicketRoomDetail = (scheduleCode) => { // {scheduleCode from url}
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${scheduleCode}`)
    }

}

export const bookingMngService = new BookingManagementService();