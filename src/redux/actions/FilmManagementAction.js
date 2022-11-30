import { filmMngService } from "../../services/FilmManagementService";
import { SET_FILM_INFO, SET_FILM_LIST } from "./types/FilmManagementType";
import { history } from '../../App';

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

export const addFilmUploadImageAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await filmMngService.addFilmUploadImage(formData);
            alert('Add film successfully!');
            console.log('resultFilmUploadImage', result.data.content)
        } catch (errors) {
            console.log(errors.response?.data)
        }
    }
}

export const getFilmInfoAction = (maPhim) => {
    return async (dispatch) => {
        try {
            //Use param maPhim
            const result = await filmMngService.getFilmInfo(maPhim);
            // console.log('resultFilmInfoAction', result.data.content);

            dispatch({
                type: SET_FILM_INFO,
                filmInfo: result.data.content
            })

        } catch (errors) {
            console.log('errors', errors)
        }
    }
}

export const updateFilmUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            //Use param maPhim
            let result = await filmMngService.updateFilmUpload(formData);
            alert('Update film successfully!');
            console.log('resultupdateFilmUploadAction', result.data.content);

            dispatch(getFilmListAction());
            history.pushState(`/admin/films`);

        } catch (errors) {
            console.log(errors)
        }
    }
}