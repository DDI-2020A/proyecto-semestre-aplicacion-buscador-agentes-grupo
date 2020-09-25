import React, { createElement, useState, useEffect } from 'react';
import { Comment, Tooltip, Avatar, List } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { db } from '../../utils/firebase_sdk';

const UserComment = ({comment}) => {
    const root = {
        margin:10,
    }
    return (
        <Comment
            style={root}
            author={<a>{comment.name}</a>}
            avatar={
                <Avatar
                    src={comment.photoUrl}
                    alt={comment.name}
                />
            }
            content={
                <p>{comment.content}</p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    );
}

export default function Comments({ uid }) {
    const [comments, setComments] = useState([]);

    const fetch = async () => {
        const snap = await db.collection('users').doc(uid).collection('comments').get();
        const list = snap.docs.map((doc,index) => ({key:index,...doc.data()}) );
        setComments(list);
    }

    useEffect(
        () => {
            fetch();
        }
        , []
    )
    return (
        <List
            size="large"
            bordered
            dataSource={comments}
            renderItem={comment => <UserComment comment={comment}/>}
        />
    );
};
