import { Button, Card, Modal, Divider } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Comment, Tooltip, Avatar } from 'antd';
import Descriptions from 'antd/es/descriptions';
import React, { useState, useEffect } from 'react';
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Comments from "./Comments";
import CommentsList from "./CommentsList";


const Agents = (props) => {

  const [listMovies, setListMovies]= useState(props.listMovies);
  const [imdbID, setImdbID]= useState(null);
  const [currentMovie, setCurrentMovie]= useState({});
  const [createInfoModalVisible, setCreateInfoModalVisible]=useState(false);
  const [createCommentModalVisible, setCreateCommentsModalVisible]=useState(false);
  const [movieDetails, setMovieDetails]=useState({});

  useEffect(()=>{
    console.log('list movies',props.listMovies);
    setListMovies(props.listMovies)
  },[props.listMovies]);

  useEffect(()=>{
    const getMovieDetails = async ()=>{
      if(imdbID){
        const data = await fetch(`http://www.omdbapi.com/?apikey=dba37ff3&i=${ imdbID }`);
        const jsonMovie = await data.json();
        setMovieDetails(jsonMovie);
        setCreateInfoModalVisible(true);
      }
    };getMovieDetails();
  },[imdbID]);

  const handleOpenComments =(movie, index)=>{
    setCurrentMovie({
      index,
      data: movie
    });
    setCreateCommentsModalVisible(true)
  };

  const handleAddComment = (text)=>{
    setListMovies((prevListMovies)=>{
      const movieToAddComment = prevListMovies.Search[currentMovie.index];


      if(movieToAddComment['comments']){
        movieToAddComment['comments'].push('text');
        // movieToAddComment['comments'] = [
        //   ...movieToAddComment['comments'],
        //   text
        // ];
      }else{
        movieToAddComment['comments'] = [text];
      }
      console.log('movieToAddComment',movieToAddComment);

      //realioza una copia de PREVLISTMOVIES.SEARCH
      const movieListUpdate = prevListMovies.Search;
      movieListUpdate[currentMovie.index] = movieToAddComment;
      return{
        ...prevListMovies,
        Search:movieListUpdate
      }
    });
  };

  return(
  <div>
  {
    listMovies && listMovies.Search
    ? listMovies.Search.map((item, index)=>{
      return(
        <Comment
      key={`movie-${index}`}
      width={400}
      author={item.Title}
      avatar={
        <Avatar
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      alt="Han Solo"
        />
    }
      content={
        <p>
        We supply a series of design principles, practical patterns and high quality design
      resources (Sketch and Axure), to help people create their product prototypes beautifully
      and efficiently.
      </p>
    }
      actions={[
        <Button type='primary' onClick={()=> handleOpenComments(item, index)} key='edit'>Comentarios</Button>,
        <Button icon={<EllipsisOutlined/>} onClick={()=>setImdbID(item.imdbID)} key='ellipsis'/>
    ]}
      />

      // <Card
      // key={`movie-${index}`}
      // style={{width:350, display:'inline-block'}}
      // cover={<img src={item.Poster} alt={item.Title}/>}
      // actions={[
      //   <Button icon={<EditOutlined/>} onClick={()=> handleOpenComments(item, index)} key='edit'/>,
      //   <Button icon={<EllipsisOutlined/>} onClick={()=>setImdbID(item.imdbID)} key='ellipsis'/>
      // ]}
      // >
      //   <Meta title={ item.Title } description={'Año: ' + item.Year}
      //   />
      // </Card>

    )
    })

    :'Cargando'
}
<Modal
  title={`Agregar comentario para ${currentMovie.data && currentMovie.data.Title}`}
  visible={ createCommentModalVisible }
  onOk={ () => setCreateCommentsModalVisible( false ) }
  onCancel={ () => setCreateCommentsModalVisible( false ) }
  footer={ null }
    >
    <div>
    <CommentsList onAddComment={handleAddComment}
  movieComments={currentMovie && currentMovie.data && currentMovie.data.comments
    ?currentMovie.data.comments
    :[]
}/>
  </div>
  </Modal>
  <Modal
  title='Informacion pelicula: '
  visible={ createInfoModalVisible }
  onOk={ () => setCreateInfoModalVisible( false ) }
  onCancel={ () => setCreateInfoModalVisible( false ) }
  width={900}
  footer={ null }
    >
    <Descriptions bordered>
  <Descriptions.Item label="Publicada">{  movieDetails.Released }</Descriptions.Item>
    <Descriptions.Item label="Duracion">{ movieDetails.Runtime }</Descriptions.Item>
    <Descriptions.Item label="Escritor">{ movieDetails.Writer }</Descriptions.Item>
    <Descriptions.Item label="Actores" span={ 2 }>
    { movieDetails.Actors }
    </Descriptions.Item>
    </Descriptions>
    <Comments/>
    </Modal>
    </div>
)
}

export default Agents;