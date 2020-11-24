import { gql } from '@apollo/client';

export const ADD_LIKE = gql`
  mutation addLike($postId: String){
    addLike(postId: $postId){
      success
      message
    }
  }
`;

export const CANCEL_LIKE = gql`
  mutation cancelLike($postId: String){
    cancelLike(postId: $postId){
      success
      message
    }
  }
`;
