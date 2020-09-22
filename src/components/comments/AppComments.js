import { Button, Input, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../styles/AppComments.css';
import Agents from './Agents';

function AppComments() {

  const [ listAgents, setListAgents ] = useState( null );
  const [ title, setTitle ] = useState( 'lord' );

  useEffect( () => {
    const getListAgents = async() => {
      const data = await fetch( `http://www.omdbapi.com/?apikey=dba37ff3&s=${ title }` );
      const jsonListAgents = await data.json();
      console.log( 'Agents', jsonListAgents )
      setListAgents( jsonListAgents );
    };
    getListAgents();
  }, [ title ] );

  const handleResearch = () => {
    const title = '&s=' + document.querySelector( '#TITLE' ).value;
    setTitle( title );
  };

  return (
    <>
      <div className='header'>
        <PageHeader
          extra={ [
            <Input id='TITLE' placeholder='Titulo' style={ { width: 350 } }/>,
            <Button type='primary' onClick={ handleResearch }>Buscar</Button>
          ] }
        >
        </PageHeader>
      </div>
      <Agents listAgents={ listAgents }/>
    </>
  );
}

export default AppComments;
