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

    getThearterBrandInfo = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
    }
    getTheaterInfo = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}

export const theaterMngService = new TheaterManagementService();