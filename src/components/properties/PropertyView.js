import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ProperyList from './PropertyList';
import PropertyForm from './PropertyForm';
import { db } from '../../utils/firebase_sdk';

import { useDispatch, useSelector } from "react-redux";


export default function PropertyView() {
  const [properties, setProperties] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state);


  useEffect(() => {
    const init = async () => {
      const result = await db.collection('props').where('uid','==',currentUser.uid).get();
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
