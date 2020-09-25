import React from 'react'
import { StarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { HomeOutlined, AimOutlined, ContainerOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from '../../utils/firebase_sdk.js';

const Detail = ({ detail, icon, stretch }) => {
  const rootStyle = stretch ? { flexDirection: 'row', paddingTop: '0px', alignItems: 'flex-start' } :
    {
      padding: '6px 6px',
      width: '87px',
      display: 'flex'
    };

  const descriptionStyle = { fontSize: '14px', padding: '0px 6px' };
  const iconStyle = { color: 'gray' };

  const styledIcon = React.cloneElement(
    icon,
    { style: iconStyle }
  );

  return (
    <div style={rootStyle}>
      {styledIcon}
      <span style={descriptionStyle}>
        {detail}
      </span>
    </div>
  );
}

const root = {
  padding: '0 20px',
  width: '85%',
  margin: '20px 0px',
  overflowWrap: 'anywhere',
}

const remove = async (id) => {
   await db.collection('props').doc(id).delete();
}

function Details(props) {

  const data = props.propData ? props.propData : null;

  return (
    <div style={root}>

      <Detail stretch={true} detail={data.address} icon={<AimOutlined />} />

      <div style={{
        display: 'flex',
        width: '100%'
      }}>

        <Detail stretch={true} detail={data.propType} icon={<HomeOutlined />} />
        <Detail stretch={true} detail={data.operation} icon={<ContainerOutlined />} />
      </div>

      {data.description && <span style={{ margin: '20px 0' }} >
        {data.description}
      </span>
      }
      <a onClick={() => remove(props.propData.id)}>
        <Row style={{ margin: '10px 0px' }} gutter={24}>
          <Col span={10}>
            <FontAwesomeIcon style={{ color: 'red', fontSize: '30px' }} icon={faTrash} />
          </Col>
        </Row>
      </a>

    </div>

  )
}


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default function PropertyItem({ item }) {

  const wrapper = { width: 272, height: 153 }
  const img = { width: '100%', height: '100%' }
  return (
    <List.Item
      onClick={() => console.log('clicked')}
      key={item.title}
      // actions={[
      //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
      // ]}
      extra={
        item.photos.length != 0 &&
        <div style={wrapper}>
          <img
            style={img}
            alt="logo"
            src={item.photos[0]}
          />
        </div>
      }
    >
      <List.Item.Meta
        title={<a style={{ color: 'black' }} href={item.href}>{item.title}</a>}
        description={<Details propData={item} />}
      />
      {item.content}
    </List.Item>
  );
}