import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import '../app/App.css'
import { Row, Col, message } from 'antd';
//custom
import PicturesPicker from '../properties/PicturesPicker'
//redux
import { useSelector, useDispatch } from "react-redux";
//firebase
import { upload, create, update } from "./firebase";

const { Option } = Select;

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

const modes = {
    EDIT: 'edit',
    CREATE: 'create'
}

const Fields = ({ propData, mode }) => {
    const dispatch = useDispatch();
    const edit = mode == modes.EDIT;
    const { currentUser, files, uploading } = useSelector(state => state);
    const [propType, setType] = useState(edit ? propData.propType : "Casa");

    const setUploading = uploading => dispatch({ type: 'UPLOADING', payload: uploading });

    const submit = async values => {
        if (files.length == 0) {
            message.warning('Debes agregar almenos una foto.');
            return;
        }

        switch (mode) {
            case modes.CREATE:
                //create firestore doc
                create({ ...values, uid: currentUser.uid });

                //upload to storage
                setUploading(true);

                files.forEach(
                    async file => {
                        try {
                            await upload(file);
                            message.success('Foto subida');
                        } catch (e) {
                            message.error('Error');
                            return;
                        }
                    }
                );

                setUploading(false);
                break;
            case modes.EDIT:

                //create firestore doc
                update({ ...values, uid: currentUser.uid });

                //upload to storage
                setUploading(true);

                files.forEach(
                    async file => {
                        try {
                            await upload(file);
                            message.success('Foto subida');
                        } catch (e) {
                            message.error('Error');
                            return;
                        }
                    }
                );

                setUploading(false);

                break;

            default:
                break;
        }
    };


    const changeType = value => {
        setType(value);
    }

    const fail = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={submit}
            onFinishFailed={fail}
        >
            <Form.Item
                initialValue={edit ? propData.title : ""}
                label="Título"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Título obligatorio',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="operation" label="Operación" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="Venta">Venta</Option>
                    <Option value="Alquiler">Alquiler</Option>
                </Select>
            </Form.Item>

            <Form.Item name="propType" label="Tipo" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={changeType}
                    allowClear
                >
                    <Option value="Casa">Casa</Option>
                    <Option value="Terreno">Terreno</Option>
                </Select>
            </Form.Item>


            {propType !== "Terreno" &&
                <>
                    <Form.Item
                        initialValue={edit ? propData.bathrooms : ""}
                        name={'bathrooms'}
                        label="Baños"
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

                    <Form.Item
                        label="Parqueaderos"
                        name="parkings"
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

                    <Form.Item
                        label="Dormitorios"
                        name="dormitories"
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
                </>
            }

            <Form.Item
                label="Area"
                name="area"
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

            <Form.Item>
                <PicturesPicker />
            </Form.Item>

            <Form.Item
                name={'comission'}
                label="Comisión (%)"
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

            <Form.Item
                name={'price'}
                label="Precio ($)"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button
                    htmlType="submit"
                    type="primary"
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Publicando' : 'Publicar'}
                </Button>
            </Form.Item>

        </Form>

    );
}
const root = {
    minHeight:'100vh',
}
const PropertyForm = ({ propData, mode }) => {
    return (
        <Row style={root} justify="center">
            <Col xs={22} sm={8} md={8} lg={8}>
                <Fields propData={propData} mode={mode} />
            </Col>
        </Row>
    );
};

export default PropertyForm;