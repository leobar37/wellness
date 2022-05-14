import { gql } from '@apollo/client';

export const getGrowthReport = gql`
  query growthReport($input: GrowthInput!) {
    growthReport(input: $input) {
      label
      value
    }
  }
`;

export const alertsReport = gql`
query AlertsReport($input: AlertInput!){
  alertsReport(input : $input){
    typeData
    label
    sublabel
    date
    dateLabel
  }   
}
`
