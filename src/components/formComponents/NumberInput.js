import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Col, Row, Slider } from 'antd';

export default function NumberInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, depend = false, min = 0, max = 100, step = 1 }) {
    const form = Form.useFormInstance();
    const fieldDepends = Form.useWatch(depend && depend.field, form);
    // form.setFieldValue(name, '')
    const formItem =
        <Form.Item
            name={name}
            label={label}
            rules={[
                {
                    required: required,
                    message: 'Это поле обязательное'
                }
            ]}
            hidden={false}
        >
            <InputNumber
                min={min}
                max={max}
                step={step}
                // value={inputValue}
                // onChange={onChange}
                disabled={disabled}
            />
        </Form.Item>
    if (!depend) {
        return formItem
    }
    if (depend.value && depend.value == fieldDepends) {
        return formItem
    }
    if (depend.min !== false && Number(fieldDepends) >= depend.min && Number(fieldDepends) <= depend.max) {
        return formItem
    }

}
