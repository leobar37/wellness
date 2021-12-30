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
