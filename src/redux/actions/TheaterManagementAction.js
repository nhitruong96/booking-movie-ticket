import { theaterMngService } from "../../services/TheaterManagementService";
import { SET_THEATER_LIST } from "./types/TheaterType";

export const getTheaterListAction = () => {

    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url: `${DOMAIN}/api/QuanLyRap/LayThongTinLichChieuHeThongRap`,
            //     method: 'GET'
            // });

            const result = await theaterMngService.getTheaterList();

            //Send to rootReducer
            console.log('resultTheaterList', result)

            if (result.status === 200) {
                //After getting data from API => redux {reducer}
                dispatch({
                    type: SET_THEATER_LIST,
                    arrTheater: result.data.content
                })
            }
        }
        catch (errors) {
            // console.log('errors', errors)
            console.log('errors', errors.response?.data)
        }
    }
}