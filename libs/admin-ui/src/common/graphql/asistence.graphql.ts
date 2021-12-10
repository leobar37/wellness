import { gql } from '@apollo/client';
import { asistenceFragment } from './fragments/asistence.graphql';
export const createAsistence = gql`
  ${asistenceFragment}
  mutation createAsistence($asistence: InputAsistence!) {
    createAsistence(asistence: $asistence) {
      ...asistenceFragment
    }
  }
`;

export const updateAsistence = gql`
  ${asistenceFragment}
  mutation updateAsistence($input: InputAsistence!, $id: ID!) {
    updateAsistence(input: $input, id: $id) {
      ...asistenceFragment
    }
  }
`;

export const deleteAsistence = gql`
  ${asistenceFragment}
  mutation deleteAsistence($id: ID!) {
    deleteAsistence(id: $id) {
      ...asistenceFragment
    }
  }
`;

export const findAsistences = gql`
  ${asistenceFragment}
  query findAsistences($cliendId: ID!) {
    finAsistences(cliendId: $cliendId) {
      ...asistenceFragment
    }
  }
`;
