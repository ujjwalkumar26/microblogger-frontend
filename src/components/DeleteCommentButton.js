import React, {useState} from 'react'
import { Tooltip } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


function DeletePostButton({ postId, commentId }) {
    // const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [ deleteComment ] = useMutation(DELETE_COMMENT_MUTATION, {
        update() {
            setConfirmOpen(false);
        },
        onError(err) {
          console.log(err);
        },
        variables: { postId: postId , commentId: commentId }
    });

    return (
        <div>
        <Tooltip key="deleteTip" title="Delete this Comment">
        <span >
            <DeleteTwoTone twoToneColor={'red'} key = "delete" onClick={ () => setConfirmOpen(true) }/>
        </span>
        </Tooltip>

        <Modal
            title = 'Are you sure you want to delete this comment?'
            visible = {confirmOpen}
            icon = {<ExclamationCircleOutlined />}
            okText = {'Delete'}
            okType = {'danger'}
            cancelText = {'Cancel'}
            onOk = { deleteComment }
            onCancel =  { () => setConfirmOpen(false) }
        >
            <p> This will permanently delete your comment </p>
        </Modal>

    </div>
    )
}

const DELETE_COMMENT_MUTATION = gql`

    mutation($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id 
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }

`
export default DeletePostButton;