import { baseService } from "./baseService";

export class FilmManagementService extends baseService {
    constructor() {
        super();
    }

    getBannerList = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
    }
}

export const filmMngService = new FilmManagementService();