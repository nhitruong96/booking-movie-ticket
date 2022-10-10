import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { LOGIN_ACTION } from "../actions/types/UserManagementType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
    // userLogin: {}
    userLogin: user
}

export const UserManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case LOGIN_ACTION: {
            const { userLoginInfo } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(userLoginInfo));
            localStorage.setItem(TOKEN, userLoginInfo.accessToken);
            return { ...state, userLogin: userLoginInfo }
        }

        default: return { ...state }
    }
}