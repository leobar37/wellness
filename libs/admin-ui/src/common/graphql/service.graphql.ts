import { gql } from '@apollo/client';

export const getActivities = gql`
  query getActivities($filters: FiltersActivity) {
    getActivities(filters: $filters) {
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

/*
 * Plans
 */

export const getPlans = gql`
  query getPlans($filters: FiltersPlan) {
    getPlans(filters: $filters) {
      ...PlanFragment
    }
  }
`;

export const getPlan = gql`
  query getPlan($id: ID!) {
    getPlan(id: $id) {
      ...PlanFragment
    }
  }
`;

export const deletePlan = gql`
  mutation deletePlan($id: ID!) {
    deletePlan(id: $id) {
      ...PlanFragment
    }
  }
`;

export const updatePlan = gql`
  mutation updatePlan($input: PlanInput!, $id: ID!) {
    updatePlan(id: $id, input: $input) {
      ...PlanFragment
    }
  }
`;

export const createPlan = gql`
  mutation createPlan($input: PlanInput!) {
    createPlan(input: $input) {
      ...PlanFragment
    }
  }
`;

export const joinPlan = gql`
  mutation joinPlan($contract: ContractInput!) {
    joinPlan(contract: $contract) {
      ...ContractFragment
    }
  }
`;

export const JoinActivity = gql`
  mutation JoinActivity($contract: ContractInput!) {
    joinActivity(contract: $contract) {
      ...ContractFragment
    }
  }
`;

// contracts

export const getViewContracts = gql`
  query getViewContracts($filters: FiContractsView) {
    getViewContracts(filters: $filters) {
      ...ContractViewFragment
    }
  }
`;

export const editContract = gql`
  mutation editContract($input: ContractEditInput!) {
    editContract(input: $input) {
      ...ContractViewFragment
    }
  }
`;

export const deleteContract = gql`
  mutation deleteContract($id: ID!) {
    deleteContract(id: $id) {
      ...ContractViewFragment
    }
  }
`;
