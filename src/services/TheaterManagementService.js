import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";

export class TheaterManagementService extends baseService {
    constructor() {
        super();
    }

    getTheaterList = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    getMovieShowtimeInfo = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
}

export const theaterMngService = new TheaterManagementService();