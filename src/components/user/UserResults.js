import React, { useState } from 'react'
import { Table, Space, Avatar, Modal } from 'antd';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from 'antd';

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import Comments from './Comments';

const Counter = ({length}) => {

    const placeholder = { color: 'gray'};

    return (
        <Row style={{padding:'6px 0px'}} gutter={24} justify="center">
            <Col style={{textAlign:'center'}} span={12}>
                <span style={placeholder}>Resultados {length}</span>
            </Col>
        </Row>
    )
}



const Action = ({ icon, color }) => {
    const root = {
        fontSize: 20,
        marginLeft: 5,
    }
    if (color) {
        root['color'] = color
    }
    return (
        <FontAwesomeIcon style={root} icon={icon} />
    )
}

const UserPreview = ({ user }) => {
    const root = { display: 'flex' }
    return (
        <div style={root}>
            <Avatar style={{ marginRight: 7 }} src={user.photoUrl} />
        </div>
    )
}

export default function UserResults({ users }) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    const showModal = () => {
        setVisible(true);
    };

    const columns = [
        {
            title: <FontAwesomeIcon style={{ fontSize: 20, marginLeft: 5 }} icon={faCamera} />,
            dataIndex: 'photoUrl',
            key: 'photoUrl',
            render: (text, user) => <UserPreview user={user} />,
            responsive: ['md'],
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text, user) => <h3>{user.name} {user.lname}</h3>
        },
        {
            title: 'Negocios cerrados',
            dataIndex: 'sells',
            key: 'sells',
            responsive: ['md'],
        },
        {
            title: 'Reputación',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Sector',
            dataIndex: 'address',
            key: 'address',
            responsive: ['md'],
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        setSelected(record);
                        showModal();
                    }}>
                        <Action icon={faComment}></Action>
                    </a>
                    <a>
                        <Action icon={faHome} color='purple'></Action>
                    </a>
                </Space>
            ),
        },
    ];

    const handleOk = e => {
        console.log(e);
        setVisible(false);
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    return (
        <>
            <Counter length={users.length}/>
            <Table columns={columns} dataSource={users} />
            {selected &&
                <Modal
                    title={`Comentarios de ${selected.name}`}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >


                    <Comments uid={selected.uid} />

                </Modal>
            }
        </>
    )
}

