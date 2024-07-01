import { Button, Form, Input, InputNumber, message, Space, Select } from 'antd';
import React from 'react'

export default function Wrapper({ children, depend, name }) {
    const form = Form.useFormInstance();
    const fieldDepends = Form.useWatch(depend && depend.field, form);
    // form.setFieldValue(name, '')
    console.log(fieldDepends)
    const formItem =children
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
