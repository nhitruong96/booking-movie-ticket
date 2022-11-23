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

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
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
          <Input name="tenPhim" />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" />
        </Form.Item>
        <Form.Item label="Description">
          <Input name="moTa" />
        </Form.Item>
        <Form.Item label="Release Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Now Playing">
          <Switch />
        </Form.Item>
        <Form.Item label="Coming soon">
          <Switch />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch />
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Poster">
          <input type="file" />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        
        
      </Form>
    </>
  );
};


export default AddNew;