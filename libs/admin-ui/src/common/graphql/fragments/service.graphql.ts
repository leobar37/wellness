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
  }
`;
