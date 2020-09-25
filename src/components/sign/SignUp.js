import React, { useState } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import '../app/App.css'
import { Row, Col } from 'antd';
import { Switch } from 'antd';
//api
import { saveUserDoc } from './../../utils/firestore';
import { useHistory } from 'react-router-dom';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: 'Debes escribir tu ${label}',
    types: {
        email: 'correo no inválido',
        number: 'número no válido',
    },
    number: {
        range: '${label} debe ser mayor que ${min} y menor que ${max}',
    },
};


const SignForm = () => {
    const [visible, setVisible] = useState(true);
    const history = useHistory();

    const switched = checked => {
        setVisible(checked);
    }

    const onFinish = async values => {
        const { name, lname, email, password, address, phone } = values;

        const { app, db } = await import('./../../utils/firebase_sdk');

        try {
            await app.auth().createUserWithEmailAndPassword(email, password);

            const unsuscribe = app.auth().onAuthStateChanged((user) => {

                if (user) {
                    const userData = {
                        uid: user.uid,
                        name,
                        lname,
                        email,
                        address,
                        phone,
                        photoUrl: '',
                        experience: 0,
                        licenseCode: "",
                        roles: [],
                        role: "",
                        score: 0,
                        status: "Miembro",
                        sells: 0,
                        ci: ""
                    };
                    saveUserDoc(db, userData);
                }
                unsuscribe();
                console.log('user created, listener removed');
                //todo: redirect to home
                history.push('/Home');
            });

        } catch (e) {
            alert(e);
        };

    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Row gutter={24} justify="center">
                <Col>
                    <h2>
                        Registrarse
                    </h2>
                </Col>
            </Row>
            <Form {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
                <Form.Item
                    name={'name'}
                    label="Nombre"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'lname'}
                    label="Apellido"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Correo"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Porfavor escribe tu email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Debes escribir una contraseña',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Celular"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Porfavor escribe tu número',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'address'}
                    label="Dirección"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'experience'}
                    label="Experiencia (años)"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 99,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item label="¿Tienes licencia?">
                    <Switch defaultChecked onChange={switched} />
                </Form.Item>

                {visible &&
                    <Form.Item name={'licenseCode'} label="Licencia">
                        <Input />
                    </Form.Item>
                }
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Registrarse
                </Button>
                </Form.Item>
            </Form>
        </>

    );
}
const SignUp = () => {
    return (
        <Row className="sign-root" justify="center">
            <Col span={8}>
                <SignForm />
            </Col>
        </Row>
    );
};

export default SignUp