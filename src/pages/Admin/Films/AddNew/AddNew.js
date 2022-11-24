import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (value) => {
      console.log('value', value)
    }
  })

  const handleChangeDatePicker = (value) => {
    //console.log('datepickerchange', value);
    let releaseDate = moment(value).format('MM/DD/YYYY');
    formik.setFieldValue('release date', releaseDate);

  }

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeFile = (e) => {
    //Get file from event
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
      //Create object to read file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        setImgSrc(e.target.result); //Image base 64
      }
      //Save data file to formik
      formik.setFieldValue('hinhAnh', file);

      //formik.setErrors()
    }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Add New film</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Movie name">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Description">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Release Date">
          <DatePicker format={"MM/DD/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Now Playing">
          <Switch onChange={handleChangeSwitch('dangChieu')} />
        </Form.Item>
        <Form.Item label="Coming soon">
          <Switch onChange={handleChangeSwitch('sapChieu')} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch('hot')} />
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
        </Form.Item>
        <Form.Item label="Poster">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/jpg, image/gif" />
          <br />
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
        </Form.Item>
        <Form.Item label="Action">
          <button type="submit" className="bg-blue-300 text-white p-2">Add film</button>
        </Form.Item>
      </Form>
    </>
  );
};


export default AddNew;