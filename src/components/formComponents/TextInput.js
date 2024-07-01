import React from 'react'
import { Button, Form, Input, InputNumber, message, Space } from 'antd';

export default function TextInput({ name = 'name', label = 'Label', disabled = false, hidden = false, placeholder = 'placeholder', required = false, depend = false }) {
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
            <Input
                placeholder={placeholder}
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
