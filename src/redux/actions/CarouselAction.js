import axios from "axios";
import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "./types/CarouselType";
import { filmMngService } from "../../services/FilmManagementService";

// export const getCarouselAction = () => {
//     return dispatch => {
//     }
// }

export const getCarouselAction = () => {

    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
            //     method: 'GET'
            // });

            const result = await filmMngService.getBannerList();

            //Send to rootReducer
            console.log('resultBannerList', result)

            //Send to rootReducer
            if (result.status === 200) {
                //After getting data from API => redux {reducer}
                dispatch({
                    type: SET_CAROUSEL,
                    arrImg: result.data.content
                })
            }
        }
        catch (errors) {
            console.log('errors', errors)
        }
    }
}
