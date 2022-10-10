import { baseService } from "./baseService";

export class UserManagementService extends baseService {
    constructor() {
        super();
    }

    login = (loginInfo) => { // {taiKhoan:'', matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, loginInfo)
    }

}

export const userMngService = new UserManagementService();