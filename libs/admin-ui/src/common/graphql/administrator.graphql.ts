import { gql } from '@apollo/client';
import { administratorFragment } from './fragments/administrator.graphql';

export const createAdminMutation = gql`
  ${administratorFragment}
  mutation registerAdmin($input: RegisterAdminInput!) {
    registerAdmin(input: $input) {
      ...administratorFragment
    }
  }
`;

export const editAdministrator = gql`
  mutation editAdministrator($input: RegisterAdminInput!, $id: ID!) {
    editAdministrator(input: $input, id: $id) {
      ...administratorFragment
    }
  }
`;

export const resetPassword = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      ...administratorFragment
    }
  }
`;

export const resetPasswordFromAdmin = gql`
  mutation resetPasswordFromAdmin($input: ResetPasswordInputFromAdmin!) {
    resetPasswordFromAdmin(input: $input) {
      ...administratorFragment
    }
  }
`;

export const getAdministrator = gql`
  query getAdministrator($id: ID!) {
    getAdministrator(id: $id) {
      ...administratorFragment
    }
  }
`;
