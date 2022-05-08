import gql from 'graphql-tag';

const FETCH_POSTS_QUERY = gql `
  query {
    getPosts  {
      id 
      body 
      createdAt 
      username 
      likeCount 
      commentCount
      likes { 
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`

export default FETCH_POSTS_QUERY;
