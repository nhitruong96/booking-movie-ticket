import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { LOGIN_ACTION, SET_USER_INFO } from "../actions/types/UserManagementType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    // userLogin: {}
    userLogin: user,
    userInfo: {}
}

export const UserManagementReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case LOGIN_ACTION: {
            const { userLogin } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));
            localStorage.setItem(TOKEN, userLogin.accessToken);
            return { ...state, userLogin: userLogin }
        }

        case SET_USER_INFO: {
            state.userInfo = action.userInfo;
            return {...state};
        }

        default: return { ...state }
    }
}