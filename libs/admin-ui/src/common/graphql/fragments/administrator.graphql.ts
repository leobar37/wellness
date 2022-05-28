import { gql } from '@apollo/client';

export const administratorFragment = gql`
  fragment administratorFragment on Administrator {
    id
    createdAt
    updateAt
    name
    lastName
    email
    rol
    dni
    password
  }
`;

export const listAdministratorsQuery = gql`
  query getAdministrators {
    getAdministrators {
      ...administratorFragment
    }
  }
`;

export const deleteAdministrator = gql`
  mutation deleteAdministrator($id: ID!) {
    deleteAdministrator(id: $id) {
      ...administratorFragment
    }
  }
`;
