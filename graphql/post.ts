import { gql } from "@apollo/client";

export const POSTS_GET = gql`
  query postsGet {
    postsGet @client {
      id
      content
      finished
      created_At
    }
  }
`;

export const POST_CREATE = gql`
  mutation postCreate($content: String!) {
    postCreate(content: $content) @client
  }
`;

export const POST_UPDATE = gql`
  mutation postCreate($content: String!, $finished: Boolean!) @client {
    content
    finished
  }
`;
