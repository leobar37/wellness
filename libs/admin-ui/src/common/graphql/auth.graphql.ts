import { gql } from '@apollo/client';

export const loginAdminMutation = gql`
  mutation login($input: LoginAdminInput!) {
    login(input: $input) {
      access_token
    }
  }
`;
