import React, { useEffect } from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.scss'
import { Tabs, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmDetailAction } from '../../redux/actions/TheaterManagementAction';
import moment from 'moment/moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;

export default function Detail(props) {

    // const { filmDetail } = useSelector(state => state.FilmManagementReducer);
    const filmDetail = useSelector(state => state.FilmManagementReducer.filmDetail);

    console.log({ filmDetail });

    const dispatch = useDispatch();

    useEffect(() => {
        //Get param info from url
        let { id } = props.match.params;
        // console.log('id', id)

        dispatch(getFilmDetailAction(id));
    }, [])

    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: 150, minHeight: '100vh' }}
                effectColor="#fff" // required (color of border)
                color="#fff" // default color is white (color of text)
                blur={30} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img src={filmDetail.hinhAnh} className="col-span-1" style={{ width: '100%', height: 300 }} alt={filmDetail.tenPhim} />
                            <div className="col-span-2 ml-5" style={{ marginTop: '25%' }}>
                                <p className="text-sm">Movie times start on: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className="text-3xl">{filmDetail.tenPhim}</p>
                                <p>{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 ">
                        <h1 style={{ marginLeft: '15%', color: 'rgb(74,222,128)', fontSize: '20', fontWeight: 'bold' }}>Rating</h1>
                        <h1 style={{ marginLeft: '2%' }} className="text-green-400 text-2xl">
                            <Rate disabled allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} />
                        </h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia}/10</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container bg-white px-5 py-5 mt-20 ml-72 w-2/3">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Showtimes" key="1">
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {filmDetail.heThongRapChieu?.map((theaterBrand, index) => {
                                        return <TabPane
                                            tab={<div>
                                                <img src={theaterBrand.logo} width={50} height={50} alt={theaterBrand.tenHeThongRap} />
                                                {theaterBrand.tenHeThongRap}
                                            </div>} key={index}>
                                            {theaterBrand.cumRapChieu?.map((theater, index) => {
                                                return <div className="mt-5" key={index}>
                                                    <div className="flex flex-row">
                                                        {<img src={theater.hinhAnh} style={{ width: 60, height: 60 }} alt={theater.tenCumRap} />}
                                                        <div className="ml-2">
                                                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }}>{theater.tenCumRap}</p>
                                                            <p style={{ marginTop: 0 }} className="text-gray-400">{theater.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        {theater.lichChieuPhim?.slice(0, 12).map((showtime, index) => {
                                                            return <NavLink to={`/checkout/${showtime.maLichChieu}`} key={index} className="col-span-1 text-green-700 font-bold">
                                                                {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Details" key="2">
                            Details
                        </TabPane>
                        <TabPane tab="Reviews" key="3">
                            Review
                        </TabPane>
                    </Tabs>
                </div>

            </CustomCard>
        </div>
    )
}
