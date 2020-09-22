import React, { Component, useEffect, useState } from 'react';
import { Button, Input, PageHeader, Radio } from 'antd';
import '../../styles/AppComments.css';
import Agents from './Agents';

function AppComments() {

  const [ listMovies, setListMovies ] = useState( null );
  const [ title, setTitle ] = useState( 'lord' );

  useEffect( () => {
    const getListMovies = async() => {
      const data = await fetch( `http://www.omdbapi.com/?apikey=dba37ff3&s=${ title }` );
      const jsonListMovies = await data.json();
      console.log( 'Movies', jsonListMovies )
      setListMovies( jsonListMovies );
    };
    getListMovies();
  }, [ title ] );

  const handleResearch = () => {
    const title = document.querySelector( '#TITLE' ).value;
    setTitle( title );
  };
  return (
    <>
      <div className='header'>
        <PageHeader
          title='TUPELI'
          extra={[
            <Input id='TITLE' placeholder='Titulo' style={{width:350}}/>,
            <Input placeholder='Año' style={{width:350}}/>,
            <label>Tipo</label>,
              <Radio.Group>
              <Radio value={1}>Todo</Radio>
                <Radio value={2}>Peliculas</Radio>
                <Radio value={3}>Series</Radio>
                </Radio.Group>,
                <Button type='primary' onClick={handleResearch}>Buscar</Button>
            ]}
          >
        </PageHeader>
      </div>
      <Agents listMovies={listMovies}/>
    </>
  );

}

export default AppComments;
