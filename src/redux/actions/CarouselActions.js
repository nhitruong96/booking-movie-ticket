import axios from "axios";
import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "./types/CarouselType";

// export const getCarouselAction = () => {
//     return dispatch => {
//     }
// }

export const getCarouselAction = () => {
    
    return async (dispatch) => {
        try {
            const result = await axios({
                url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
                method: 'GET'
            });

            //Send to rootReducer
            console.log('result', result)

            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content
            })
        }
        catch (errors) {
            console.log('errors', errors)
        }
    }
}
