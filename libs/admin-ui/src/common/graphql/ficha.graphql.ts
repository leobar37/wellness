import { gql } from '@apollo/client';

export const openAndCloseFicha = gql`
  mutation openAndClose($input: FichaInput!) {
    openAndCloseFicha(input: $input) {
      ...fichaFragment
    }
  }
`;

export const updateFicha = gql`
  mutation updateFicha($input: FichaInput!) {
    updateFicha(input: $input) {
      ...fichaFragment
    }
  }
`;
