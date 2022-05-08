import React from 'react'
import { Tooltip } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

function CommentButton({commentCount, id, enabled}) {
    const navigate = useNavigate();
    const commentOnPost  = () => {
        if(enabled) navigate(`/posts/${id}`);
    };
    return (
        <Tooltip key="comment-basic-like" title="Comment">
        <span >
            <CommentOutlined key = "comment" onClick={commentOnPost}/>
            <span className="comment-action" style={{ "paddingLeft": 8}}>{commentCount}</span>
        </span>
        </Tooltip>
    )
}
export default CommentButton;