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

export const getClients = gql`
  ${ClientFragment}
  query getClients {
    clients {
      ...ClientFragment
    }
  }
`;

export const getClient = gql`
  ${ClientFragment}
  query getClient($id: ID!) {
    client(id: $id) {
      ...ClientFragment
    }
  }
`;

export const updateClient = gql`
  mutation updateClient($input: ClientInput!, $id: ID!) {
    updateCLient(id: $id, input: $input) {
      ...ClientFragment
    }
  }
`;


export const getReporClientById= gql`
query clientReport($clientId: ID!){ 
   clientReport(clientId : $clientId){
     planProgress {
      progress
      contractLabel
      price
      finishedAt
      createdAt
      daysLeft
    } 
   }
}

`