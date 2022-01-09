import { gql } from '@apollo/client';
export const getActivities = gql`
  query getActivities {
    getActivities {
      ...ActivityFragment
    }
  }
`;

export const createActivity = gql`
  mutation createActivity($input: ActivityInput!) {
    createActivity(input: $input) {
      ...ActivityFragment
    }
  }
`;

export const getPlans = gql`
  query getPlans {
    getPlans {
      ...PlanFragment
    }
  }
`;

export const getActivity = gql`
  query getActivity($id: ID!) {
    getActivity(id: $id) {
      ...ActivityFragment
    }
  }
`;

export const updateActivity = gql`
  mutation updateActivity($input: ActivityInput!, $id: ID!) {
    updateActivity(id: $id, input: $input) {
      ...ActivityFragment
    }
  }
`;

export const deleteActivity = gql`
  mutation deleteActivity($id: ID!) {
    deleteActivity(id: $id) {
      ...ActivityFragment
    }
  }
`;
