import React, {useContext} from 'react'
import { useQuery} from '@apollo/react-hooks';
import Posts from '../components/Posts';
import {Card} from 'antd';
import MenuBar from '../components/MenuBar';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import  FETCH_POSTS_QUERY from '../util/graphql';
function Home() {

  const {user} = useContext(AuthContext);
  const {loading, data} = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
    <MenuBar/>
    {
      !loading && user && <PostForm/>
    }
    <div style = {{margin: "5%"}}>
    { loading 
      ? <Card style={{ width: "30%", height: "20%",  marginLeft: "30%", marginTop: 16 }}  loading = {loading} /> 
      : <Posts props = {data}/>  
    }
    </div>
    </>
  )
}
export default Home;