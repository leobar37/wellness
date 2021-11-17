import { gql } from '@apollo/client';

export const ClientFragment = gql`
  fragment ClientFragment on Client {
    code
    dni
    email
    name
    lastName
    birth
    phone
    direction
    sex
    mode
  }
`;
