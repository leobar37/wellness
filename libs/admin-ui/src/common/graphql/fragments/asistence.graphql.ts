import { gql } from '@apollo/client';

export const asistenceFragment = gql`
  fragment asistenceFragment on Asistence {
    id
    createdAt
    updateAt
    note
  }
`;
