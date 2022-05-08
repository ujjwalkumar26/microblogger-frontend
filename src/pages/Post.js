import React, {useContext} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import CreateComment from '../components/CreateComment';
import DeletePostButton from '../components/DeletePostButton';
import DeleteCommentButton from '../components/DeleteCommentButton';
import MenuBar from '../components/MenuBar';
import { Card, Comment, Avatar, Tooltip } from 'antd';
import { AuthContext } from '../context/auth';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

function Post() {
    const {user} = useContext(AuthContext);
    const params = useParams();
    const postId = params.postId;
    const navigate = useNavigate();
    const {data, refetch} = useQuery(GET_POST_QUERY, {
        variables:  { postId }
    });

    
    let element;
    if(data) {
        const {id, username, likes, body, createdAt, commentCount, likeCount, comments } = data.getPost;
        const actions = [
                            <LikeButton likes = {likes} user = {user} likeCount = {likeCount} id = {id}/>,
                            <CommentButton enabled = {false} commentCount={commentCount} id = {id} />,
                        ];
        if(user && user.username === username) {
            actions.push(<DeletePostButton postId = {id} callback = { () => { navigate('/') }}/>);
        }
        element = (
            <div>
                <Card
                    style={{ "width": "80%", marginLeft: '8%', marginRight: '2%'}}
                    actions={ actions }
                >
                    <Card.Grid hoverable = {false} style={ {width: '30%', textAlign: 'center',}}>  
                        <img
                            alt="example"
                            src={`https://avatars.dicebear.com/api/human/${username}.svg`}
                            width= '100%'
                            height = '40%'
                        />
                    </Card.Grid>
                    <Card.Grid  hoverable = {false} style={ {width: '70%', height: "auto" }}>
                        <Meta
                            title={username}
                            description= { `Posted: ${moment(createdAt).fromNow().charAt(0).toUpperCase()
                                            + moment(createdAt).fromNow().slice(1)
                                        }`}
                        />
                    </Card.Grid>
                    <Card.Grid  hoverable = {false} style={ {width: '70%', height: 'auto'}}>
                        <p style={{paddingTop: "2%"}}>{body}</p>
                    </Card.Grid>
                </Card>

                {
                    user && (<CreateComment user = {user} postId = {id} />)
                }

                {   
                    comments.map(comment => (
                        <Comment
                            style={{ "width": "80%", marginLeft: '8%', marginRight: '2%'}}
                            key = {comment.id}
                            author={comment.username}
                            actions= {[
                                user && user.username === comment.username && (<DeleteCommentButton commentId = {comment.id} postId = {id}/>)
                            ]}
                            avatar={<Avatar src={`https://avatars.dicebear.com/api/human/${comment.username}.svg`} alt={comment.username} />}
                            content={
                            <p>
                               { comment.body }
                            </p>
                            }
                            datetime={
                                <Tooltip title={moment(comment.createdAt).fromNow()}>
                                    <span>{moment(comment.createdAt).fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    ))
                }

            </div>
        )
    }
    else element  = (<div className="loading-spinner"><Spin key = {refetch()} size = "large"/></div>);
    
    return (
        <>
        <MenuBar/>
        <div style = {{margin: "5%"}}>
            {element}
        </div>
        </>
    )
}



const GET_POST_QUERY = gql`

    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            username
            createdAt
            comments {
                id
                body
                username
                createdAt
            }
            likeCount
            likes {
                id
                username
                createdAt
            }
            commentCount
        }
    }

`
export default Post;
