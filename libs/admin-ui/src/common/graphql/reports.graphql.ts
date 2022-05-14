import { gql } from '@apollo/client';

export const getGrowthReport = gql`
  query growthReport($input: GrowthInput!) {
    growthReport(input: $input) {
      label
      value
    }
  }
`;
