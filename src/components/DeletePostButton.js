import React, {useState} from 'react'
import { Tooltip } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import FETCH_POSTS_QUERY from '../util/graphql';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


function DeletePostButton({ postId, callback }) {
    // const navigate = useNavigate();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [ deletePost ] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
                variables: { id: postId }
            });
            data.getPosts = data.getPosts.filter(post => post.id !== postId)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data
            });
            if(callback) callback();
        },
        onError(err) {
          console.log(err);
        },
        variables: { id: postId }
    });

    return (
        <div>
            <Tooltip key="deleteTip" title="Delete this post">
            <span >
                <DeleteTwoTone twoToneColor={'red'} key = "delete" onClick={ () => setConfirmOpen(true) }/>
            </span>
            </Tooltip>
            <Modal
                title = 'Are you sure you want to delete this post?'
                visible = {confirmOpen}
                icon = {<ExclamationCircleOutlined />}
                okText = {'Delete'}
                okType = {'danger'}
                cancelText = {'Cancel'}
                onOk = { deletePost }
                onCancel =  { () => setConfirmOpen(false) }
            >
                <p> This will permanently delete your post </p>
            </Modal>
        </div>
    )
}

const DELETE_POST_MUTATION = gql`

    mutation($id: ID!) {
        deletePost(id: $id)
    }

`
export default DeletePostButton;