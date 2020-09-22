import React, { useEffect, useState } from 'react';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import Descriptions from 'antd/es/descriptions';
import Comments from './Comments';
import CommentsList from './CommentsList';
import Comment from "antd/es/comment";
import Avatar from "antd/es/avatar";
import Tooltip from "antd/es/tooltip";
import moment from "moment";

const Agents = ( props ) => {

  const [ listAgents, setListAgents ] = useState( props.listAgents );
  const [ imdbID, setImdbID ] = useState( null );
  const [ currentAgent, setCurrentAgent ] = useState( {} );
  const [ AgentDetails, setAgentDetails ] = useState( {} );
  const [ createInfoModalVisible, setCreateInfoModalVisible ] = useState( false );
  const [ createCommentModalVisible, setCreateCommentsModalVisible ] = useState( false );

  useEffect( () => {
    console.log( 'list Agents', props.listAgents );
    setListAgents( props.listAgents );
  }, [ props.listAgents ] );

  useEffect( () => {
    const getAgentDetails = async() => {
      if( imdbID ) {
        const response = await fetch( `http://www.omdbapi.com/?apikey=135f640d&i=${ imdbID }` );
        const AgentJson = await response.json();
        setAgentDetails( AgentJson );
        setCreateInfoModalVisible( true );
      }
    };

    getAgentDetails();
  }, [ imdbID ] );

  const handleOpenComments = ( Agent, index ) => {
    setCurrentAgent( {
      index,
      data: Agent
    } );
    setCreateCommentsModalVisible( true );
  };

  const handleAddComment = ( text ) => {
    setListAgents( ( prevListAgents ) => {
      const AgentToAddComment = prevListAgents.Search[currentAgent.index];

      if( AgentToAddComment['comments'] ) {
        AgentToAddComment['comments'].push( text );
      } else {
        AgentToAddComment['comments'] = [ text ];
      }

      const AgentListUpdated = prevListAgents.Search;
      AgentListUpdated[currentAgent.index] = AgentToAddComment;

      return {
        ...prevListAgents,
        Search: AgentListUpdated
      };

    } );
  };

  return (
    <div>
      {
        listAgents && listAgents.Search
          ?
          listAgents.Search.map( ( item, index ) => {
            return (
              <Comment
                key={ `Agent-${ index }` }
                style={ {
                  width: 1400, display: 'inline-block'
                } }
                author={ item.Title }
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    We supply a series of design principles, practical patterns and high quality design
                    We supply a series of design principles, practical patterns and high quality design
                  </p>
                }
                actions={ [
                  <Button type='primary'
                          style={{marginRight:10}}
                          onClick={ () => handleOpenComments( item, index ) }
                          key='edit'>Ver commentarios</Button>,
                  <Button type='primary'
                          onClick={ () => setImdbID( item.imdbID ) }
                          key='ellipsis'>Ver Agente</Button>
                ] }
                datetime={
                  <Tooltip title={ moment().format( 'YYYY-MM-DD HH:mm:ss' ) }>
                    <span>{ moment().fromNow() }</span>
                  </Tooltip>
                }
              />
            );
          } )
          : 'Cargando'
      }


      <Modal
        title='Informacion pelicula: '
        visible={ createInfoModalVisible }
        onOk={ () => setCreateInfoModalVisible( false ) }
        onCancel={ () => setCreateInfoModalVisible( false ) }
        width={ 900 }
        footer={ null }
      >
        <Descriptions bordered>
          <Descriptions.Item label='Publicada'>{ AgentDetails.Released }</Descriptions.Item>
          <Descriptions.Item label='Duracion'>{ AgentDetails.Runtime }</Descriptions.Item>
          <Descriptions.Item label='Escritor'>{ AgentDetails.Writer }</Descriptions.Item>
          <Descriptions.Item label='Actores' span={ 2 }>
            { AgentDetails.Actors }
          </Descriptions.Item>
        </Descriptions>
        <Comments/>
      </Modal>


      <Modal
        title={ `Agregar Comentarios para: ${ currentAgent.data && currentAgent.data.Title }` }
        visible={ createCommentModalVisible }
        onOk={ () => setCreateCommentsModalVisible( false ) }
        onCancel={ () => setCreateCommentsModalVisible( false ) }
        footer={ null }
      >
        <div>
          <CommentsList onAddComment={ handleAddComment }
                        AgentComments={ currentAgent && currentAgent.data && currentAgent.data.comments
                          ? currentAgent.data.comments
                          : [] }/>
        </div>
      </Modal>


    </div>
  );
};
export default Agents;


