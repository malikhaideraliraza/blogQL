import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($postInput: PostInput){
    createPost(postInput: $postInput){
      success
      message
      post {
        _id
        title
        body
        likes
        createdAt
        createdBy {
          _id
          name
        }
      }
    }
  }
`;
