import React, { useEffect, useState } from 'react'
import { Input, Typography } from 'antd';
import useStore from '../store/useStore';

const { TextArea } = Input;

export default function InputJson() {
    const json = useStore(state => state.json)
    const createJson = useStore(state => state.createJson)
    const [value,setValue] = useState(false)
    useEffect(() => {
        try {            
            console.log(localStorage.getItem('json'))
            createJson(localStorage.getItem('json'))
            setValue(localStorage.getItem('json'))
        } catch (error) {
            
        }
    }, [])

    const handlerChange = (event) => {
        console.log(event.target.value)
        createJson(event.target.value)
        setValue(event.target.value)
    }
    return (
        <div>
            <Typography.Title level={3} style={{ textAlign: "center" }}>Ввод JSON для формы</Typography.Title>
            <TextArea rows={4} autoSize={{ minRows: 6 }} onChange={handlerChange} value={value}/>
        </div>
    )
}
