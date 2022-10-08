import React, { useEffect } from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.scss'
import { Tabs, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmDetailAction } from '../../redux/actions/TheaterManagementAction';
import moment from 'moment/moment';
import { StarOutlined } from '@ant-design/icons'

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
                        <h1 style={{ marginLeft: '10%' }} className="text-green-400 text-2xl">
                            <StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined /><StarOutlined />
                        </h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-10">
                    <Tabs tabPosition={'left'}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab 3
                        </TabPane>
                    </Tabs>
                </div>

            </CustomCard>
        </div>
    )
}
