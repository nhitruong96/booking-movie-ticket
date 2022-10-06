import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css'
import Film from "../Film";

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
export default class MultipleRowSlick extends Component {

    renderFilms = () => {
        return this.props.arrFilm.map((item, index) => {
            return <div key={index} className={`${styleSlick['width-item']}`}>
                 <Film film={item}/>
            </div>
        })
    }

    render() {
        const settings = {
            className: "center variable-width",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500,
            rows: 1,
            slidesPerRow: 2,
            variableWidth: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div>
                <h2>Multiple Rows</h2>
                <Slider {...settings}>
                    {this.renderFilms()}
                    {this.renderFilms()}
                    {this.renderFilms()}
                    {this.renderFilms()}
                    {this.renderFilms()}
                    {this.renderFilms()}
                    {this.renderFilms()}
                    {this.renderFilms()}

                    {/* <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                    <div>
                        <h3>7</h3>
                    </div>
                    <div>
                        <h3>8</h3>
                    </div>
                    <div>
                        <h3>9</h3>
                    </div>
                    <div>
                        <h3>10</h3>
                    </div>
                    <div>
                        <h3>11</h3>
                    </div>
                    <div>
                        <h3>12</h3>
                    </div>
                    <div>
                        <h3>13</h3>
                    </div>
                    <div>
                        <h3>14</h3>
                    </div>
                    <div>
                        <h3>15</h3>
                    </div>
                    <div>
                        <h3>16</h3>
                    </div> */}
                </Slider>
            </div>
        );
    }
}