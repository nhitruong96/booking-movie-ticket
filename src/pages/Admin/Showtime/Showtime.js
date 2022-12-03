import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { theaterMngService } from '../../../services/TheaterManagementService';
import { useFormik } from 'formik';
import moment from 'moment';
import { bookingMngService } from '../../../services/BookingManagementService';

export default function Showtime(props) {

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: async (values) => {
      console.log('values', values);
      try {
        const result = await bookingMngService.createShowtime(values);

        alert(result.data.content);

      } catch (error) {
        console.log('error', error);
      }
    }
  })

  const [state, setState] = useState({
    theaterBrands: [],
    theaters: [],
  })
  console.log('state', state.theaterBrands)

  useEffect(async () => {
    try {
      let result = await theaterMngService.getThearterBrandInfo();

      setState({
        ...state,
        theaterBrands: result.data.content
      })

    } catch (error) {
      console.log('error', error.response?.data)
    }
  }, [])

  const handleChangeTheaterBrand = async (value) => {
    // console.log('maHeThongRap', values)
    //from theater brand call api to get theater info
    try {
      let result = await theaterMngService.getTheaterInfo(value);

      setState({
        ...state,
        theaters: result.data.content
      })
    } catch (error) {
      console.log('error', error.response?.data)
    }
  }

  const handleChangeTheater = (value) => {
    formik.setFieldValue('maRap', value)
  }

  const onOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    console.log('values', moment(values).format('DD/MM/YYYY hh:mm:ss'))
  }

  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    console.log('values', moment(values).format('DD/MM/YYYY hh:mm:ss'))
  }

  const onChangeInputNumber = (values) => {
    formik.setFieldValue('giaVe', values)
    console.log('value', values)
  }

  const convertSelectHTR = () => {
    //state.theaterBrands?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap }))
    return state.theaterBrands?.map((theaterBrand, index) => {
      return { label: theaterBrand.tenHeThongRap, value: theaterBrand.maHeThongRap }
    })
  }

  console.log(props.match.params);
  let film = {};
  if(localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'));
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // initialValues={{ remember: true }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-2xl">Create showtime - {props.match.params.tenphim}</h3>
      <img src={film.hinhAnh} alt={film.tenPhim} width={200} height={100} />
      <Form.Item label="Theater brand" >
        <Select options={convertSelectHTR()} onChange={handleChangeTheaterBrand} placeholder="Please select theater brand" />
      </Form.Item>

      <Form.Item label="Theater" >
        <Select options={state.theaters?.map((theater, index) => ({ label: theater.tenCumRap, value: theater.maCumRap }))} onChange={handleChangeTheater} placeholder="Please select theater" />
      </Form.Item>

      <Form.Item label="Date and Time" >
        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
      </Form.Item>

      <Form.Item label="Ticket price" >
        <InputNumber onChange={onChangeInputNumber} />
      </Form.Item>

      <Form.Item label="Action" >
        <Button htmlType="submit">Create Showtime</Button>
      </Form.Item>

    </Form>
  )
}
