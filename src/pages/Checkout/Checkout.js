import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { bookTicketAction, getTicketRoomDetailAction } from '../../redux/actions/BookingManagementAction';
import style from './Checkout.module.css'
import './Checkout.css'
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import { BOOK_TICKET } from '../../redux/actions/types/BookingManagementType';
import _ from 'lodash';
import { BookTicketInfo } from '../../_core/models/BookTicketInfo';
import { Tabs } from 'antd';
import { getUserInfoAction } from '../../redux/actions/UserManagementAction';
import moment from 'moment';


function Checkout(props) {

  const { userLogin } = useSelector(state => state.UserManagementReducer);

  const { ticketRoomDetail, seatBookingList, seatBookingByOthersList } = useSelector(state => state.BookingManagementReducer);
  // console.log('ticketRoomDetail', ticketRoomDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    //Call function create 1 async function
    // let { id } = props.match.params; //id from App.js
    const action = getTicketRoomDetailAction(props.match.params.id);
    //Dispatch function to reducer
    //dispatch(id)
    dispatch(action);
  }, []);

  console.log('ticketRoomDetail', ticketRoomDetail);

  const { thongTinPhim, danhSachGhe } = ticketRoomDetail;

  const renderSeats = () => {
    return danhSachGhe.map((seat, index) => {

      let classSeatVip = seat.loaiGhe === 'Vip' ? 'seatVip' : '';
      let classSeatBooked = seat.daDat === true ? 'seatBooked' : '';
      let classVipBooked = seat.daDat === true ? 'seatVipBooked' : '';

      let classSeatBooking = '';
      //Check each seat render to see whether it's in the seat booking list
      let indexSeatBooking = seatBookingList.findIndex(seatBooking => seatBooking.maGhe === seat.maGhe);
      if (indexSeatBooking !== -1) {
        classSeatBooking = 'seatBooking';
      }

      let classSeatBookedByMe = '';
      if (userLogin.taiKhoan === seat.taiKhoanNguoiDat) {
        classSeatBookedByMe = 'seatBookedByMe';
      }

      //Check each render seat to see if it is booked by others
      let classSeatBookingByOthers = '';
      let indexSeatBookingByOthers = seatBookingByOthersList.findIndex(seatBookingByOthers => seatBookingByOthers.maGhe === seat.maGhe);
      if (indexSeatBookingByOthers !== -1) {
        classSeatBookingByOthers = 'seatBookingByOthers';
      }

      return <Fragment key={index}>
        <button onClick={() => {
          dispatch({
            type: BOOK_TICKET,
            seatSelected: seat
          })
        }}
          disabled={seat.daDat || classSeatBookingByOthers !== ''}
          className={`seat ${classSeatVip} ${classVipBooked} ${classSeatBooked} ${classSeatBooking} ${classSeatBookedByMe} ${classSeatBookingByOthers} text-center`}>
          {seat.daDat ? classSeatBookedByMe !== '' | classSeatBookingByOthers !== ''  ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : seat.stt}
        </button>

        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className="min-h-screen mt-5" style={{ minHeight: '100vh' }}>
      <div className="grid grid-cols-12">
        <div className="col-span-9">

          <div className="mt-1 flex justify-center">
            <table className="divide-y divide-gray-300 w-2/3">
              <thead className="bg-gray-200 p-5">
                <tr>
                  <th>Available</th>
                  <th>Unavailable</th>
                  <th>Selected</th>
                  <th>Vip</th>
                  <th>Booked By Me</th>
                  <th>Booked By Others</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="text-center">
                  <td><button className="seat"></button></td>
                  <td><button className="seat seatBooked"><CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button></td>
                  <td><button className="seat seatBooking"></button></td>
                  <td><button className="seat seatVip"></button></td>
                  <td><button className="seat seatBookedByMe"><UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button></td>
                  <td><button className="seat seatBookingByOthers"><UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center mt-5">
            <div className="bg-black" style={{ width: '80%', height: 15 }}>
            </div>
            <div className={`${style[`trapezoid`]} text-center`}>
              <h3 className="mt-2 text-black">SCREEN</h3>
            </div>
            <div className="text-center">
              <h1 className="mt-2 text-black">FRONT OF THEATER</h1>
            </div>
            <div>
              {renderSeats()}
            </div>
            <div className="text-center">
              <h1 className="mt-2 text-black">BACK OF THEATER</h1>
            </div>
          </div>

        </div>

        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-2xl">Total ${seatBookingList.reduce((total, seat, index) => {
            return total += seat.giaVe / 24000;
          }, 0).toFixed(2).toLocaleString()}</h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p>Theater Address: {thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
          <p>Showtime: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-green-400 text-lg">Seat</span>
              {_.sortBy(seatBookingList, ['stt']).map((seatBooking, index) => {
                return <span key={index} className="text-red-400 text-xl"> {seatBooking.stt}</span>
              })}
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-500 text-lg">$
                {seatBookingList.reduce((total, seat, index) => {
                  return total += seat.giaVe / 24000;
                }, 0).toFixed(2).toLocaleString()}
              </span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i> <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i> <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col items-center" style={{ marginBottom: 0 }}>
            <div onClick={() => {
              const bookTicketInfo = new BookTicketInfo();
              bookTicketInfo.maLichChieu = props.match.params.id;
              bookTicketInfo.danhSachVe = seatBookingList;

              console.log(bookTicketInfo);

              dispatch(bookTicketAction(bookTicketInfo));

            }} className="bg-green-500 text-white w-full text-center py-3 front-bold text-2xl cursor-pointer">
              Book Ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const { TabPane } = Tabs;

// function callback(key) {
//   console.log(key);
// }

export default function CheckoutTab(props) {

  const { tabActive } = useSelector(state => state.BookingManagementReducer);
  console.log('tabActive', tabActive);

  const dispatch = useDispatch();

  return <div className="p-5">
    <Tabs defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
        console.log('key', key);
        dispatch({
          type: 'CHANGE_TAB_ACTIVE',
          tabActive: key
        })
      }}>
      {/* If tabActive is integer => activeKey="{tabActive.toString()}"*/}
      {/* onChange={callback} */}
      <TabPane tab="01 Select Seats & Payment" key="1">
        <Checkout {...props} />
      </TabPane>
      <TabPane tab="02 Purchase Confirmation" key="2">
        <ResultBooking {...props} />
      </TabPane>
    </Tabs>
  </div>
}

function ResultBooking(props) {

  const { userInfo } = useSelector(state => state.UserManagementReducer);

  const { userLogin } = useSelector(state => state.UserManagementReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = getUserInfoAction();
    dispatch(action);
  }, [])

  console.log('userInfo', userInfo);

  const renderTicketItem = () => {
    return userInfo.thongTinDatVe?.map((ticket, index) => {

      const seats = _.first(ticket.danhSachGhe)

      return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
            <p className="text-gray-500">Time: {moment(ticket.ngayDat).format('hh:mm A')} - Date: {moment(ticket.ngayDat).format('MM-DD-YYYY')}</p>
            <p>Theater Address: {seats.tenHeThongRap} - {seats.tenCumRap}</p>
            <p>Room: {seats.tenCumRap} </p>
            <p>
              Seat: {ticket.danhSachGhe.map((seat, index) => {
                return <span key={index}>{seat.tenGhe}</span>
              })}
            </p>
          </div>
        </div>
      </div>
    })
  }


  return <div className="p-5">
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">Purchase History</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">View all your booked movies history</p>
        </div>
        <div className="flex flex-wrap -m-2">
          {renderTicketItem()}

        </div>
      </div>
    </section>

  </div>
}

