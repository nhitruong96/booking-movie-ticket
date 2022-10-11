import { userMngService } from "../../services/UserManagementService"
import { LOGIN_ACTION } from "./types/UserManagementType";
import { history } from "../../App"

export const loginAction = (loginInfo) => {

    return async (dispatch) => {
        try {

            //Getting data from API
            const result = await userMngService.login(loginInfo);

            //After getting data from API => redux {reducer}
            // if (result.data.statusCode === 200) {
            if (result.status === 200) {
                dispatch({
                    type: LOGIN_ACTION,
                    userLoginInfo: result.data.content
                });
                // Redirect after login successfully to previous page
                history.goBack();
            }

            console.log('resultUserLogin', result)
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}