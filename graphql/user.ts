import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation userLogin($id: String!, $password: String!) {
    login(id: $id, password: $password) @client {
      id
      username
    }
  }
`;

export const USER_LOGOUT = gql`
  query userLogout {
    logout @client
  }
`;

export const USER_CREATE = gql`
  mutation userCreate($id: String!, $password: String!) {
    createUser(id: $id, password: $password) @client {
      id
      username
    }
  }
`;
