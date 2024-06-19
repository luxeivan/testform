import React from 'react';
import { Button, Flex, Form, Input, InputNumber, message, Space } from 'antd';
import TextInput from './formComponents/TextInput';
import SelectInput from './formComponents/SelectInput';
import formJson from './Form.json'
import SwitchInput from './formComponents/SwitchInput';
import SliderInput from './formComponents/SliderInput';
const FormMain = () => {
  const [form] = Form.useForm();
  const onFinish = (event) => {
    message.success('Submit success!');
    console.log(event)
    form.resetFields()
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  return (
    <Form
      style={{ border: "1px solid lightgray", padding: "20px", borderRadius: "10px" }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="right"
    >
      {formJson.map((item, index) => {
        if (item.type === 'textInput') {
          return <TextInput key={index} {...item} />
        }
        if (item.type === 'switchInput') {
          return <SwitchInput key={index} {...item} />
        }
        if (item.type === 'selectInput') {
          return <SelectInput key={index} {...item} />
        }
        if (item.type === 'sliderInput') {
          return <SliderInput key={index} {...item} />
        }

      })}


      <Form.Item wrapperCol={16}>
        <Space>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
          <Button onClick={() => { form.setFieldsValue({ Фамилия: "Петров", Имя: "Петр", Отчество: "Петрович", Пол: "male" }) }}>
            Заполнить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default FormMain;