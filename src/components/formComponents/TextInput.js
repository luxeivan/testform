import React from 'react'
import { Button, Form, Input, InputNumber, message, Space } from 'antd';

export default function TextInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, depend = false }) {
    const form = Form.useFormInstance()
    if (typeof depend === 'string' && depend !=='') {
        depend = JSON.parse(depend)
    }
    console.log(depend)
    const fieldDepends = Form.useWatch(depend && depend.field, form)
    return (
        <>
            {/* {depend && !(depend.value == fieldDepends) && */}

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
                    <Input placeholder={placeholder} disabled={disabled} />
                </Form.Item>
            {/* } */}
        </>
    )
}
