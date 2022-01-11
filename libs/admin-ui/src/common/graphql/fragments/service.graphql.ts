import { gql } from '@apollo/client';

export const DetailFragment = gql`
  fragment DetailFragment on Detail {
    name
    description
    price
  }
`;
export const PlanFragment = gql`
  ${DetailFragment}
  fragment PlanFragment on Plan {
    id
    createdAt
    updateAt
    detail {
      ...DetailFragment
    }
    visible
    suscription {
      ...SubscriptionFragment
    }
  }
`;

export const SuscriptionFragment = gql`
  fragment SubscriptionFragment on Suscription {
    id
    createdAt
    updateAt
    duration
    active
    mode
    startAt
    finishedAt
    startAt
  }
`;
export const ActivityFragment = gql`
  ${DetailFragment}
  fragment ActivityFragment on Activity {
    id
    createdAt
    updateAt
    detail {
      ...DetailFragment
    }
    suscription {
      ...SubscriptionFragment
    }
  }
`;

export const ContractFragment = gql`
  fragment ContractFragment on Contract {
    id
    createdAt
    updateAt
    note
    paid
    price
    finishedAt
    suscription {
      ...SubscriptionFragment
    }
  }
`;
