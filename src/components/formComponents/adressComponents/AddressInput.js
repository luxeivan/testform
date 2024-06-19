import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, message, Space, Col, Row, Slider, AutoComplete } from 'antd';

export default function AddressInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, depend = false, min = 0, max = 100, step = 1, bound = false }) {
    const form = Form.useFormInstance()
    const fieldDepends = Form.useWatch(depend && depend.field, form)
    const [options, setOptions] = useState([]);

    const getFiasValue = (text)=>{

    }

    const onSelect = (data) => {
        console.log('onSelect', data);
    };
    return (
        <Form.Item
            name={name}
            label={label}
            rules={!(depend && !(depend.value == fieldDepends)) && [
                {
                    required: required,
                    message: 'Это поле обязательное'
                }
            ]}
            hidden={depend && !(depend.value == fieldDepends)}
        >
            <AutoComplete
                options={options}
                onSelect={onSelect}
                onSearch={(text) => getFiasValue(text)}
                placeholder={placeholder}
                disabled={disabled}
            />
        </Form.Item>
    )
}
