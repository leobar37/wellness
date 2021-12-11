import { gql } from '@apollo/client';
import { AssetBootFragment } from './asset.graphql';
export const FichaFragment = gql`
  ${AssetBootFragment}
  fragment fichaFragment on Ficha {
    id
    createdAt
    closedAt
    closed
    updateAt
    details {
      id
      open
      createdAt
      updateAt
      weight
      objective
      note
      asset {
        ...AssetBoot
      }
    }
  }
`;
