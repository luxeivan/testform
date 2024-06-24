import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Flex, Form, Input, InputNumber, message, Space, Typography } from 'antd';
import TextInput from './formComponents/TextInput';
import SelectInput from './formComponents/SelectInput';
import SwitchInput from './formComponents/SwitchInput';
import SliderInput from './formComponents/SliderInput';
import DividerForm from './formComponents/DividerForm';
import NumberInput from './formComponents/NumberInput';
import CoordinateInput from './formComponents/CoordinateInput';
import AddressInput from './formComponents/adressComponents/AddressInput';
import useStore from '../store/useStore';
import axios from 'axios';
// import formJson from './Form.json'


const FormOneC = () => {
    const [formJson, setFormJson] = useState()
    const [accordance, setAccordance] = useState()
    const [refKey, setRefKey] = useState('ce667ca7-2ee9-11ef-b0d9-b6a98f0a6177')
    // const formJson = useStore(state => state.json)
    const [form] = Form.useForm();
    const getClaimByRef = () => {
        axios.get(`http://45.89.189.5/InfoBase/odata/standard.odata/Catalog_Заявки(guid'${refKey}')?$format=json`)
            .then(res => {
                console.log(res.data)
                const dataForm = {}
                res.data.fields.forEach(item => {
                    dataForm[item.fieldName] = item.value
                })
                form.setFieldsValue(dataForm)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get("http://45.89.189.5/InfoBase/odata/standard.odata/Catalog_КаталогУслуг_components?$format=json&$expand=component,inUTP&$filter=Ref_Key eq guid'c2065852-21d9-11ef-b0d7-a0473164b88f'")
            .then(res => {
                console.log(res.data)
                setFormJson(res.data.value)
                const convertType = (type) => {
                    if (type === "String") return "Edm.String"
                    if (type === "Boolean") return "Edm.Boolean"
                    if (type === "Number") return "Edm.Int64"
                    if (type === "EnumRef.НаименованиеОбъектаПрисоединения") return "StandardODATA.НаименованиеОбъектаПрисоединения"
                }
                setAccordance(res.data.value.map(item => ({
                    Ref_Key: item.inUTP?.Ref_Key,
                    Type: convertType(item.inUTP?.ValueType.Types[0]),
                    field: item.component_Expanded.name
                })))
            })
            .catch(err => console.log(err))
    }, [])
    const onFinish = (events) => {
        message.success('JSON вывелся в консоль');
        const arrayFields = [];

        for (let event in events) {
            if (events.hasOwnProperty(event)) {
                arrayFields.push({ field: event, value: events[event] })
            }
        }
        console.log(arrayFields)
        const url = "http://45.89.189.5/InfoBase/odata/standard.odata/Catalog_Заявки?$format=json"
        const optionsPost = {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                Description: `Новая заявка`,
                fields: arrayFields.map((item, index) => ({ LineNumber: index + 1, fieldName: item.field, inUTP_Key: accordance.find(elem => elem.field === item.field).Ref_Key, value: item.value, value_Type: accordance.find(elem => elem.field === item.field).Type }))
            })
        }
        // console.log(optionsPost.body)
        fetch(url, optionsPost)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log("error", error));
    };

    const onFinishFailed = () => {
        message.error('Ошибка отправки формы');
    };
    return (
        <>
            <Typography.Title level={3} style={{ textAlign: "center" }}>Наивысшая форма</Typography.Title>
            <Form
                style={{ border: "1px solid lightgray", padding: "20px", borderRadius: "10px" }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12 }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelAlign="right"
                labelWrap
            >
                {Array.isArray(formJson) && formJson.map((item, index) => {
                    // console.log(item)

                    if (item.component_Type.includes('Divider')) {
                        return <DividerForm key={index} {...item.component_Expanded} />
                    }
                    if (item.component_Type.includes('TextInput')) {
                        return <TextInput key={index} {...item.component_Expanded} />
                    }
                    if (item.component_Type.includes('SliderInput')) {
                        return <SliderInput key={index} {...item.component_Expanded} />
                    }
                    if (item.component_Type.includes('SelectInput')) {
                        return <SelectInput key={index} {...item.component_Expanded} />
                    }
                    if (item.component_Type.includes('SwitchInput')) {
                        return <SwitchInput key={index} {...item.component_Expanded} />
                    }
                    if (item.type === 'numberInput') {
                        return <NumberInput key={index} {...item} />
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
                    if (item.type === 'сoordinateInput') {
                        return <CoordinateInput key={index} {...item} />
                    }
                    if (item.type === 'autoCompleteInput') {
                        return <AddressInput key={index} {...item} />
                    }

                })}


                <Form.Item wrapperCol={16}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Отправить
                        </Button>
                        <Button danger onClick={() => { form.resetFields() }}>
                            Очистить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            <Flex gap={20} style={{ padding: "30px", marginBottom: "50px" }} >
                <Input value={refKey} onChange={(event) => {
                    setRefKey(event.target.value)
                }} width={200} />
                <Button onClick={getClaimByRef}>
                    Заполнить по RefKey
                </Button>
            </Flex>
        </>
    );
};
export default FormOneC;