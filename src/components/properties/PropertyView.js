import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ProperyList from './PropertyList';
import PropertyForm from './PropertyForm';
import { db } from '../../utils/firebase_sdk';

export default function News() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result = await db.collection('props').orderBy("date","desc").get();
      const docs = result.docs.map(
        doc => {
          return doc.data();
        }
      );
      console.log('properties',docs)
      setProperties(docs);
    }
    init();

    const unsubscribe = db.collection('props').onSnapshot(
      () => init()
    );

    init();

    return unsubscribe;

  }, [])
  // const layout = { xs: '22', sm: '12', md: '12', lg: '12' };

  const root = {
    height: '100vh',
    background: 'white',
    paddingTop: 100,
  }

  return (
    <div >
      <Row justify="center">
        <Col xs={22} sm={22} md={10} lg={10}>
          <PropertyForm/>
        </Col>
        <Col xs={22} sm={22} md={10} lg={10}>
          <ProperyList properties={properties} />
        </Col>
      </Row>
    </div>
  );
}
