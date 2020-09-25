import React from 'react'

import { List, Space } from 'antd';
import PropetyItem from './PropertyItem';

const root = {
    borderRadius: 25,
    padding: 20,
    boxShadow: '-1px 1px 21px -5px rgba(0,0,0,1)'
}

export default function PropertyList({properties}) {
    return (<List
        style={root}
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={properties}
        footer={
            <div>
                <b>ant design</b> footer part
                </div>
        }
        renderItem={item => <PropetyItem item={item}/>}
    />
    );
}