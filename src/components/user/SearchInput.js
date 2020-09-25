import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd';
import { Row, Col } from 'antd';
import { db } from '../../utils/firebase_sdk';
import { useDispatch, useSelector } from "react-redux";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default function SearchInput({ action }) {
    const dispatch = useDispatch();
    const loading  = useSelector(state =>  state.loading);
    const setLoading = loading => dispatch({type:'SET_LOADING',payload:loading});

    const searchProfiles = async (name) => {
        message.success('Buscando a ' + name + ' ...');

        const snap = await db.collection('users').where('name','==',name).get();
        const profiles = snap.docs.map((profile,index) => ({...profile.data(),key:index}));
        action(profiles);

        setLoading(false);
    }

    const defaultSearch = async () => {
        const snap = await db.collection('users').get();
        const profiles = snap.docs.map((profile,index) => ({...profile.data(),key:index}));
        action(profiles);

        setLoading(false);
    }


    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true);
        if (values.name == "" || values.name == undefined) {
            defaultSearch();
            return;
        }
        searchProfiles(values.name);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row gutter={24} justify="center">
            <Col span={12}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[
                            { min: 3, message: 'Mínimo 3 caracteres' },
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button disabled={loading} type="primary" htmlType="submit">
                            Buscar
                        </Button>
                        <span style={{ color: 'gray', margin: '0 6px' }}>o presione Enter</span>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
