import React from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film'
import MultipleRowSlick from '../../components/Film/RSlick/MultipleRowSlick'

export default function Home(props) {

    const { arrFilm } = useSelector(state => state.FilmManagementReducer)


    console.log('propsHome', props)
    //props.history
    //props.location
    //props.match.params

    const renderFilms = () => {
        return arrFilm.map((item, index) => {
            return <Film key={index} />
        })
    }

    return (

        <div>
            <MultipleRowSlick />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
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
