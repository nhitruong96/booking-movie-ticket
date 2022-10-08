import React from 'react'
import { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;

export default function HomeMenu(props) {

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    };

    const { tabPosition } = state;

    console.log(props, 'propsTheaterList')

    const renderTheaterList = () => {
        return props.arrTheater?.map((theaterBrand, index) => {
            return <TabPane tab={<img src={theaterBrand.logo} className="rounded-full" width="50" />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {theaterBrand.lstCumRap?.map((theater, index) => {
                        return <TabPane tab={
                            <div style={{ width: '300px', display: 'flex' }}>
                                <img src={theaterBrand.logo} width="50" />
                                <br />
                                <div className="text-left ml-2">
                                    {theater.tenCumRap}
                                    <p className="text-red-200">Detail</p>
                                </div>
                            </div>
                        } key={index}>
                            {/* Load film according to theater */}
                            {theater.danhSachPhim.slice(0, 4).map((film, index) => {
                                return <Fragment key={index}>
                                    <div className="my-5" style={{ display: 'flex' }}>
                                        <img src={film.hinhAnh} alt={film.tenPhim} style={{ height: 75, width: 75 }} 
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />
                                        <div className="ml-2">
                                            <h1 className="text-xl text-green-700">{film.tenPhim}</h1>
                                            <p>{theater.diaChi}</p>
                                            <div className="grid grid-cols-6 gap-10">
                                                {film.lstLichChieuTheoPhim?.slice(0, 12).map((showtime, index) => {
                                                    return <NavLink to="/" className="text-lg text-green-400" key={index}>
                                                        {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
                                                    </NavLink>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }

    return (
        <div>
            <Tabs tabPosition={tabPosition}>
                {renderTheaterList()}
            </Tabs>
        </div>
    )
}
