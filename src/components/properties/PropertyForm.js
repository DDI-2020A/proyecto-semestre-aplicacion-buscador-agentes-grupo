import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import '../app/App.css'
import { Row, Col, message } from 'antd';
//custom
import PicturesPicker from '../properties/PicturesPicker'
//redux
import { useSelector, useDispatch } from "react-redux";
//firebase
import { upload, update } from "./firebase";
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 12,
    },
    wrapperCol: {
        span: 18,
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

const validateMessages = {
    required: 'Debes escribir el ${label}',
    types: {
        email: 'correo no inválido',
        number: 'número no válido',
    },
    number: {
        range: '${label} debe ser mayor que ${min} y menor que ${max}',
    },
};


const Fields = ({ propData, mode }) => {
    const [form] = Form.useForm();
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
        const { db, firebase } = await import('../../utils/firebase_sdk')
        let ref = db.collection('props');
        const uid = currentUser.uid;
        //create firestore doc

        ref = ref.doc()
        const id = ref.id
        const property = { ...values, id, photos: [], uid, date: firebase.firestore.Timestamp.fromDate(new Date()) };

        ref.set(property, { merge: true });

        ///
        console.log('ref :', ref);
        //upload to storage
        setUploading(true);

        files.forEach(
            async file => {
                const { storage } = await import('../../utils/firebase_sdk');
                const metadata = {
                    contentType: 'image/jpeg'
                }
                const storageRef = storage.ref();
                const imgFile = storageRef.child(`props/${uid}/${id}/${uuidv4()}`);
                console.log('uploading');
                const task = imgFile.put(file, metadata);

                //update progress bar
                const unsuscribe = task.on('state_changed',
                    function error(err) {
                        console.log('error:', err)
                    },
                    async function complete(err) {
                        message.success('Foto subida');

                        console.log('completed');
                        //unsuscribe
                        unsuscribe();

                        // Upload completed successfully, now we can get the download URL
                        task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                            const { firebase } = await import('../../utils/firebase_sdk');

                            //update photos atribute (array) of the prop doc
                            await ref.set({
                                photos: firebase.firestore.FieldValue.arrayUnion(downloadURL)
                            }, { merge: true });
                            message.success('Foto subida');
                        });

                    },
                );
            }
        );

        setUploading(false);

        //update firestore doc
        // await update({ ...values, uid: currentUser.uid });

        //upload to storage
        // setUploading(true);

        // files.forEach(
        //     async file => {
        //         try {
        //             await upload(file);
        //             message.success('Foto subida');
        //         } catch (e) {
        //             message.error('Error');
        //             return;
        //         }
        //     }
        // );

        // setUploading(false);


        form.resetFields();
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
            style={{ minWidth: 250 }}
            form={form}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={submit}
            onFinishFailed={fail}
            validateMessages={validateMessages}
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

            <Form.Item
                initialValue={edit ? propData.address : ""}
                label="Dirección"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Dirección obligatoria',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="operation" label="Operación" rules={[{ required: true }]}>
                <Select
                    allowClear
                >
                    <Option value="Venta">Venta</Option>
                    <Option value="Alquiler">Alquiler</Option>
                </Select>
            </Form.Item>

            <Form.Item name="propType" label="Tipo" rules={[{ required: true }]}>
                <Select
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
                                max: 20,
                            },
                            {
                                required: true,
                                message: 'obligatorio',
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
                                max: 20,
                            },
                            {
                                required: true,
                                message: 'obligatorio',
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
                            {
                                required: true,
                                message: 'obligatorio',
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
                        max: 10000,
                    },
                    {
                        required: true,
                        message: 'obligatorio',
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
                    {
                        required: true,
                        message: 'obligatorio',
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
                    {
                        required: true,
                        message: 'obligatorio',
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
    minHeight: '100vh',
}
const PropertyForm = ({ propData, mode }) => {
    return (
        <Row style={root} justify="center">
            <Col xs={22} sm={18} md={18} lg={18}>
                <Fields propData={propData} mode={mode} />
            </Col>
        </Row>
    );
};

export default PropertyForm;