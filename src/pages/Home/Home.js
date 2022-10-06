import React from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film'
import MultipleRowSlick from '../../components/Film/RSlick/MultipleRowSlick'
import { useEffect } from 'react'
import { getFilmListAction } from '../../redux/actions/FilmManagementAction'

export default function Home(props) {

    const { arrFilm } = useSelector(state => state.FilmManagementReducer)

    const dispatch = useDispatch();

    console.log('propsHome', props)
    //props.history
    //props.location
    //props.match.params

    // const renderFilms = () => {
    //     return arrFilm.map((item, index) => {
    //         return <Film key={index} />
    //     })
    // }

    useEffect(() => {
        const action = getFilmListAction();
        dispatch(action); //dispatch function from thunk
    }, [])

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilm={arrFilm}/>
                    {/* <div className="flex flex-wrap -m-4" style={{ justifyContent: 'center'}}>
                        {renderFilms()}
                    </div> */}
                </div>
            </section >

            <div className="mx-36">
                <HomeMenu />
            </div>
        </div >
    )
}
