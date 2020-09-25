import React from 'react'
import PropertyView from '../properties/PropertyView'
import { Row, Col } from 'antd';

export default function Panel() {
    return (

        <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={22}>
                <PropertyView />
            </Col>
        </Row>
    )
}
