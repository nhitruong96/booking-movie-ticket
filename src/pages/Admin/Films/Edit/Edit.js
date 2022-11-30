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
import { useDispatch, useSelector } from 'react-redux';
import { addFilmUploadImageAction, getFilmInfoAction, updateFilmUploadAction } from '../../../../redux/actions/FilmManagementAction';
import { GROUPID } from '../../../../util/settings/config';
import { useEffect } from 'react';

const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');

    const { filmInfo } = useSelector(state => state.FilmManagementReducer);
    console.log('filminfo', filmInfo);

    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params;

        dispatch(getFilmInfoAction(id));
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: filmInfo.maPhim,
            tenPhim: filmInfo.tenPhim,
            trailer: filmInfo.trailer,
            moTa: filmInfo.moTa,
            ngayKhoiChieu: filmInfo.ngayKhoiChieu,
            dangChieu: filmInfo.dangChieu,
            sapChieu: filmInfo.sapChieu,
            hot: filmInfo.hot,
            danhGia: filmInfo.danhGia,
            hinhAnh: null,
            maNhom: GROUPID,
        },
        
        onSubmit: (values) => {
            console.log('value', values);
            values.maNhom = GROUPID;

            //Create object formData => Send values from formik to formData
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            // formData.append('tenPhim', formik.values.tenPhim);
            // console.log('formData', formData.get('tenPhim'));
            //   console.log('formData', formData.get('File'));

            //Update film upload image in formData to backend
            dispatch(updateFilmUploadAction(formData));
        }
    })

    const handleChangeDatePicker = (value) => {
        //console.log('datepickerchange', value);
        // let releaseDate = moment(value).format('MM/DD/YYYY');
        let releaseDate = moment(value)
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

    const handleChangeFile = async (e) => {
        //Get file from event
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
             //Save data file to formik
            await formik.setFieldValue('hinhAnh', file);
            
            //Create object to read file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result); //Image base 64
            }

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
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Release Date">
                    <DatePicker format="MM/DD/YYYY" onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
                </Form.Item>
                <Form.Item label="Now Playing">
                    <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Coming soon">
                    <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Rating">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item label="Poster">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/jpg, image/gif" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? filmInfo.hinhAnh : imgSrc} alt="..." />
                </Form.Item>
                <Form.Item label="Action">
                    <button type="submit" className="bg-blue-300 text-white p-2">Update</button>
                </Form.Item>
            </Form>
        </>
    );
};


export default Edit;