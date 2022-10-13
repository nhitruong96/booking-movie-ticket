import { userMngService } from "../../services/UserManagementService"
import { LOGIN_ACTION, SET_USER_INFO } from "./types/UserManagementType";
import { history } from "../../App"

export const loginAction = (loginInfo) => {

    return async (dispatch) => {
        try {

            //Getting data from API
            const result = await userMngService.login(loginInfo);

            console.log('resultUserLogin', result)
            //After getting data from API => redux {reducer}
            // if (result.data.statusCode === 200) {
            if (result.status === 200) {
                dispatch({
                    type: LOGIN_ACTION,
                    userLogin: result.data.content
                });
                // Redirect after login successfully to previous page
                history.goBack();
            }

        } catch (error) {
            console.log('error', error)
            console.log('error', error.response?.data)
        }
    }
}

export const getUserInfoAction = () => {

    return async (dispatch) => {
        try {

            //Getting data from API
            const result = await userMngService.getUserInfo();

            console.log('resultUserInfo', result)
            //After getting data from API => redux {reducer}
            // if (result.data.statusCode === 200) {
            if (result.status === 200) {
                dispatch({
                    type: SET_USER_INFO,
                    userInfo: result.data.content
                });

            }

        } catch (error) {
            console.log('error', error)
            console.log('error', error.response?.data)
        }
    }
}