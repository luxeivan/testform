import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Switch } from 'antd';

export default function SwitchInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, depend = false }) {
    const form = Form.useFormInstance()
    const fieldDepends = Form.useWatch(depend && depend.field, form)
    return (
        <Form.Item
            name={name}
            label={label}
            rules={!(depend && !(depend.value == fieldDepends)) &&[
                {
                    required: required,
                    message: 'Это поле обязательное'
                }
            ]}
            hidden={depend && depend.value == fieldDepends}
        >
            <Switch />
        </Form.Item>
    )
}
