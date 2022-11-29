import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";

export class FilmManagementService extends baseService {
    constructor() {
        super();
    }

    getBannerList = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
    }

    getFilmList = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    }

    addFilmUploadImage = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    }

    getFilmInfo = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }
}

export const filmMngService = new FilmManagementService();