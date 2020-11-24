import { gql } from '@apollo/client';

export const VIEW_POST = gql`
  query posts {
    posts {
      success
      message
      posts{
        _id
        title
        body
        likes
        likesData
        createdAt
        createdBy{
          name
          _id
        }
      }
    }
  }
`;
