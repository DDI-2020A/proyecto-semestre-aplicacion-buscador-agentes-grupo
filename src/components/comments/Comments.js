import React, { useState } from 'react';
import List from "antd/es/list";
import Comment from "antd/es/comment";
import Tooltip from "antd/es/tooltip";
import moment from 'moment';

const Comments = ( {} ) => {

  const data = [
    {
      actions: [ <span key='comment-list-reply-to-0'>Reply to</span> ],
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>Algo algo Algo algo Algo algo Algo algo Algo algo Algo algo</p>
      ),
      datetime: (
        <Tooltip
          title={ moment()
            .subtract( 1, 'days' )
            .format( 'YYYY-MM-DD HH:mm:ss' ) }
        >
                    <span>
                    { moment()
                      .subtract( 1, 'days' )
                      .fromNow() }
                    </span>
        </Tooltip>
      ),
    },
  ];
  return (
    <>
      <List
        className='comment-list'
        header={ `${ data.length } replies` }
        itemLayout="horizontal"
        dataSource={ data }
        renderItem={ item => (
          <li>
            <Comment
              actions={ item.actions }
              author={ item.author }
              avatar={ item.avatar }
              content={ item.content }
              datetime={ item.datetime }
            />
          </li>
        ) }
      />
    </>
  )

};

export default Comments;