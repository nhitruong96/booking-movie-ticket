import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css'
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_NOW_PLAYING, SET_FILM_COMING_SOON } from "../../redux/actions/types/FilmManagementType";

function SampleNextArrow(props) {

    const { className, style, onClick } = props;

    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

const MultipleRowSlick = (props) => {

    const dispatch = useDispatch();

    const { dangChieu, sapChieu } = useSelector(state => state.FilmManagementReducer)

    const renderFilms = () => {
        return props.arrFilm.slice(0, 12).map((item, index) => {
            // return <div key={index} className={`${styleSlick['width-item']}`}>
            return <div key={index} className="mt-2">
                {/* <Film film={item}/> */}
                <Film_Flip film={item} />
            </div>
        })
    }

    let activeClassDC = dangChieu === true ? 'active_Film' : 'non_active_Film';

    let activeClassSC = sapChieu === true ? 'active_Film' : 'non_active_Film';


    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        // slidesToShow: 3,
        slidesToShow: 2,
        speed: 500,
        // rows: 1,
        rows: 2,
        slidesPerRow: 2,
        // variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div>
            <button type="button" className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border mr-2`}
                onClick={() => {
                    const action = { type: SET_FILM_NOW_PLAYING }
                    dispatch(action);
                }}
            >NOW PLAYING</button>
            <button type="button" className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`}
                onClick={() => {
                    const action = { type: SET_FILM_COMING_SOON }
                    dispatch(action);
                }}
            >COMING SOON</button>
            <Slider {...settings}>
                {renderFilms()}
            </Slider>
        </div>
    );
}

export default MultipleRowSlick;