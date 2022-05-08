import React, {useContext} from 'react';
import { Card, Avatar } from 'antd';
// import { LikeOutlined } from '@ant-design/icons';
import moment from 'moment';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeletePostButton from './DeletePostButton';
// import * as SparkMD5 from 'spark-md5';

import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

function Post( { post: {body, createdAt, username, id, likeCount, commentCount, likes} }) {
  const navigate = useNavigate();
  const onClickImage = () => {
    navigate(`posts/${id}`)
  }
  // const hash = SparkMD5.hash(username);
  const {user} = useContext(AuthContext);
  const actions = [
    <LikeButton likes = {likes} user = {user} likeCount = {likeCount} id = {id}/>,
    <CommentButton enabled = {true} user = {user} commentCount={commentCount} id = {id} />,
  ];
  if(user && user.username === username) {
    actions.push(<DeletePostButton postId = {id} />);
  }
  return (
      <Card
      style={{ width: 300, margin: "auto"}}
      hoverable 
      cover={
          <img
              alt="example"
              src= {`https://avatars.dicebear.com/api/human/${username}.svg`}
              height="200"
              onClick={onClickImage}
          />
      }
      actions={
        actions
      }
      >
      <Meta
          avatar={<Avatar src= {`https://avatars.dicebear.com/api/human/${username}.svg`} />}
          title={username}
          description= {<a href = {`/posts/${id}`}> Posted: {moment(createdAt).fromNow().charAt(0).toUpperCase() + moment(createdAt).fromNow().slice(1)}</a>}
      />
      <p style={{"paddingTop": 20}}>{body}</p>
      </Card>
  )
}

export default Post;