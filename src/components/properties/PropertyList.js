import React from 'react'

import { List, Space } from 'antd';
import PropetyItem from './PropertyItem';

export default function PropertyList({properties}) {
    return (<List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={properties}
        renderItem={item => <PropetyItem item={item}/>}
    />
    );
}