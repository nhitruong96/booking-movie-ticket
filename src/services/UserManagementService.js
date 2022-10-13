import { baseService } from "./baseService";

export class UserManagementService extends baseService {
    constructor() {
        super();
    }

    login = (loginInfo) => { // {taiKhoan:'', matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, loginInfo);
    }

    getUserInfo = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }

}

export const userMngService = new UserManagementService();