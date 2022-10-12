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

export default function Checkout(props) {

  const { userLogin } = useSelector(state => state.UserManagementReducer);

  const { ticketRoomDetail, seatBookingList } = useSelector(state => state.BookingManagementReducer);
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

      return <Fragment key={index}>
        <button onClick={() => {
          dispatch({
            type: BOOK_TICKET,
            seatSelected: seat
          })
        }}
          disable={seat.daDat}
          className={`seat ${classSeatVip} ${classVipBooked} ${classSeatBooked} ${classSeatBooking} ${classSeatBookedByMe} text-center`}>
          {seat.daDat ? classSeatBookedByMe != '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : seat.stt}
        </button>

        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className="min-h-screen mt-5" style={{ minHeight: '100vh' }}>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div className="bg-black" style={{ width: '80%', height: 15 }}>
            </div>
            <div className={`${style[`trapezoid`]} text-center`}>
              <h3 className="mt-2 text-black">Screen</h3>
            </div>
            <div>
              {renderSeats()}
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-2/3">
              <thead class="bg-gray-50 p-5">
                <tr>
                  <th>Available</th>
                  <th>Unavailable</th>
                  <th>Selected</th>
                  <th>Vip</th>
                  <th>Booked By Me</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr className="text-center">
                  <td><button className="seat"></button></td>
                  <td><button className="seat seatBooked"><CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button></td>
                  <td><button className="seat seatBooking"></button></td>
                  <td><button className="seat seatVip"></button></td>
                  <td><button className="seat seatBookedByMe"><UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-2xl">Total ${seatBookingList.reduce((total, seat, index) => {
            return total = seat.giaVe / 24000;
          }, 0).toLocaleString()}</h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p>Address: {thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
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
                  return total = seat.giaVe / 24000;
                }, 0).toLocaleString()}
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

            }} className="bg-green-500 text-white w-full text-center py-3 front-bold text-2xl">
              Book Ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
