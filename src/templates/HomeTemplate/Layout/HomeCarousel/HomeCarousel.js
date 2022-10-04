import React from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
};

export default function HomeCarousel(props) {

    const { arrImg } = useSelector(state => state.CarouselReducer)

    const dispatch = useDispatch();

    //Se tu kich hoat khi component load ra
    useEffect(() => {
        //1 action = {type:'', data: }
        //2 (need to install middleware): callBackFunction(dispatch)
        
        // const action = getCarouselAction(1);
        // dispatch(action);
        dispatch(getCarouselAction())
        
    }, []);

    console.log('arrImg', arrImg);

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} />
                </div>
            </div>
        })
    }

    return (
        <Carousel effect="fade">
            {renderImg()}
        </Carousel>
    )
}
