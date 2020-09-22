import React, { useEffect, useState } from 'react';
import Comment from "antd/es/comment";
import Avatar from "antd/es/avatar";
import List from 'antd/es/list';
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

const CommentsList = ( { onAddComment, ...props } ) => {

  const [ movieComments, setMovieComments ] = useState( props.movieComments );

  useEffect( () => {
    console.log( 'movie comments', movieComments )
    setMovieComments( props.movieComments );
  }, [ props.movieComments ] );

  const commentForm = () => (
    < >
    < Form
  name = "Coment-form"
  onFinish = { onAddComment }
    // onFinishFailed={onFinishFailed}
    >


    < FormItem
  label = "Comentario"
  name = "text"
  rules = { [{ required: true, message: 'Ingresa tu comentario' }] }
    >
    < TextArea
  rows = { 4 }
  />
  < /FormItem>
  < FormItem >
  < Button
  htmlType = "submit"
  type = "primary"
  style = {
  {
    marginTop:15
  }
}>
  Agregar
  Comentario
  < /Button>
  < /FormItem>
  < /Form>

  < />

)
  ;
  return (
    < >
    < List
  className = "comment-list"
  //header={`${data.length} replies`}
  itemLayout = "horizontal"
  dataSource = { movieComments }
  renderItem = { item
=>
  (
  < li >
  < Comment
  //actions={item.actions}
  //author={item.author}
  //avatar={item.avatar}
  content = { item.text }
  //datetime={item.datetime}
  />
  < /li>
)
}
  />
  < Comment
  avatar = {
    < Avatar
  src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  alt = "Han Solo"
    / >
}
  content = { commentForm() }
  />
  < />
)
}

export default CommentsList;