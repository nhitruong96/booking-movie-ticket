import { SET_FILM_DETAIL, SET_THEATER_LIST } from "./types/TheaterManagementType";
import { theaterMngService } from "../../services/TheaterManagementService";

export const getTheaterListAction = () => {

    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url: `${DOMAIN}/api/QuanLyRap/LayThongTinLichChieuHeThongRap`,
            //     method: 'GET'
            // });

            const result = await theaterMngService.getTheaterList();

            console.log('resultTheaterList', result)

            //Send to rootReducer
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


export const getFilmDetailAction = (id) => {

    return async (dispatch) => {
        try {
            const result = await theaterMngService.getMovieShowtimeInfo(id);

            console.log('resultFilmDetail', result);

            //Get data from API => redux
            dispatch({
                type: SET_FILM_DETAIL,
                filmDetail: result.data.content
            })

        }
        catch (errors) {
            console.log('errors', errors)
        }
    }
}