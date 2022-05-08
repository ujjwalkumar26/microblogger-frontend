import React from 'react'
import Post from '../components/Post';
import {Row, Col, Divider} from 'antd';
export default function Posts({props}) {
  return (
    <div style={{margin: "auto"}}>
    <Row gutter = {[4]}>
    
        { props.getPosts && props.getPosts.map((post, index, props) => ([ 
            <Col key = {index} >
              <Post post = {post} key = {post.id}/>
              <Divider key = {post}/> 
            </Col>
        ]))} 
  
    </Row>
    </div>
  )
}
