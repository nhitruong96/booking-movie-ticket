import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTicketRoomDetailAction } from '../../redux/actions/BookingManagementAction';
import style from './Checkout.module.css'
import './Checkout.css'
import { CloseOutlined } from '@ant-design/icons'

export default function Checkout(props) {

  const { userLogin } = useSelector(state => state.UserManagementReducer);

  const { ticketRoomDetail } = useSelector(state => state.BookingManagementReducer);
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

      return <Fragment key={index}>
        <button disable={seat.daDat} className={`seat ${classSeatVip} ${classSeatBooked} text-center`}>
          {seat.daDat ? <CloseOutlined style={{marginBottom: 7.5, fontWeight: 'bold'}} /> : seat.stt}
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
        </div>
        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-2xl">0 USD</h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p>Address: {thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
          <p>Showtime: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Seat</span>
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">0 USD</span>
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
          <div className="mb-0 h-full flex flex-col justify-end items-center" style={{ marginBottom: 0 }}>
            <div className="bg-green-500 text-white w-full text-center py-3 front-bold text-2xl">
              Book Ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
