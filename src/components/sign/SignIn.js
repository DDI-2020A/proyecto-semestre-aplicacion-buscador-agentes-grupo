import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import '../app/App.css'
import { Row, Col } from 'antd';

import {useHistory} from 'react-router-dom';

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

const SignForm = () => {
    const history = useHistory();
    const onFinish = async values => {
        console.log('Success:', values);
            const { email, password } = values;
      
            const { app } = await import('./../../utils/firebase_sdk');
      
            try {
              await app;
              const result = await app.auth().signInWithEmailAndPassword(email, password);
              console.log(result.user.email + ' signed ');
            //todo : dispatch userData
            history.push('/Home');
            } catch (error) {
              console.log(error);
            }
          
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const root = {
        filter: 'blur(4px)',
        position: 'fixed',
        zIndex: 1,
    }
    const form = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 25,
        paddingTop: 70,
        borderRadius: 20,
        margin: 'auto 0',
    }
    const primary = {
        backgroundColor: 'purple'
    }
    return (
        <Form
            style={form}
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Correo"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Porfavor escribe tu email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
        </Button>
            </Form.Item>
        </Form>
    );
};
export default function SignIn() {
    return (
        <Row className="sign-root" justify="center">
            <Col span={8}>
                <SignForm />
            </Col>
        </Row>
    )
}
