import React from 'react'
import { StarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { HomeOutlined, AimOutlined, ContainerOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';

const Detail = ({ detail, icon, stretch }) => {
  const rootStyle = stretch ? { display: 'flex', flexDirection: 'row', paddingTop: '3px', alignItems: 'flex-start' } :
    {
      width: '87px',
      display: 'flex'
    };

  const descriptionStyle = { fontSize: '14px', padding: '2px 6px' };
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
function Details(props) {

  const data = props.propData ? props.propData : null;

  return (
    <div style={root}>

      <Detail stretch={true} detail={data.address} icon={<AimOutlined />} />

      <div style={{
        display: 'flex',
        width: '100%'
      }}>

        <Detail stretch={false} detail={data.propType} icon={<HomeOutlined />} />
        <Detail stretch={false} detail={data.operation} icon={<ContainerOutlined />} />
      </div>

      {data.description && <span style={{ margin: '20px 0' }} >
        {data.description}
      </span>
      }

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

  return (
    <List.Item
      onClick={() => console.log('clicked')}
      key={item.title}
      // actions={[
      //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
      // ]}
      extra={
        item.photos.length != 0 &&
        <img
          width={272}
          alt="logo"
          src={item.photos[0]}
        />
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