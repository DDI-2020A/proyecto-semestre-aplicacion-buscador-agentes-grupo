import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ProperyList from './PropertyList';
import PropertyForm from './PropertyForm';
import { db } from '../../utils/firebase_sdk';

export default function PropertyView() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result = await db.collection('props').orderBy("date", "desc").get();
      const docs = result.docs.map(
        doc => {
          return doc.data();
        }
      );
      console.log('properties', docs)
      setProperties(docs);
    }
    init();

    const unsubscribe = db.collection('props').onSnapshot(
      () => init()
    );

    init();

    return unsubscribe;

  }, [])

  return (
    <div >
      <ProperyList properties={properties}/>
    </div>
  );
}
