import React , { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import {LikeFilled, LikeTwoTone} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';


function LikeButton({likeCount, id, likes, user}) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(()=>{
    if(user && likes.find(like => like.username === user.username)) {
      setIsLiked(true);
    }
    else setIsLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_MUTATION, {
    variables: { postId: id }
  });
  const clickLike = () => {
    if(user) {
      likePost();
    }
    else {
      navigate('/signin');
    }
  };

  const likebutton = user ? (
    isLiked ? (<LikeFilled style = { {color: 'rgb(24, 144, 255)'}} key = "like"/> ) : ( <LikeTwoTone key = "like" /> )
  ) : (
     <LikeTwoTone key = "like" /> 
  );
  

  return (
    <Tooltip key="comment-basic-like" title = {isLiked ? "Unlike" : "Like"}>
      <span onClick = {clickLike}>
        {likebutton}
        <span className="comment-action" style={{ "paddingLeft": 8}}>{likeCount}</span>
      </span>
    </Tooltip>
  )
}

const LIKE_MUTATION = gql`

  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }

`
export default LikeButton;