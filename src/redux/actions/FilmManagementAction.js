import { filmMngService } from "../../services/FilmManagementService";
import { SET_FILM_LIST } from "./types/FilmManagementType";

export const getFilmListAction = () => {

    return async (dispatch) => {
        try {
            // const result = await axios({
            //     url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
            //     method: 'GET'
            // });

            const result = await filmMngService.getFilmList();

            //Send to rootReducer
            console.log('resultFilmList', result)

            //Send to rootReducer
            if (result.status === 200) {
                //After getting data from API => redux {reducer}
                dispatch({
                    type: SET_FILM_LIST,
                    arrFilm: result.data.content
                })
            }
        }
        catch (errors) {
            console.log('errors', errors)
        }
    }
}