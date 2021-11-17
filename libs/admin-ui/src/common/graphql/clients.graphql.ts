import { gql } from '@apollo/client';
import { ClientFragment } from './fragments/client.graphql';

export const registerClient = gql`
  ${ClientFragment}
  mutation registerClient($client: ClientInput!) {
    registerClient(client: $client) {
      ...ClientFragment
    }
  }
`;
