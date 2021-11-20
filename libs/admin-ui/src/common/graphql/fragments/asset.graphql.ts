import { gql } from '@apollo/client';

export const AssetFragment = gql`
  fragment AssetFragment on Asset {
    name
    size
    previewUrl
    id
    createdAt
    updateAt
  }
`;
