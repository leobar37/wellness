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

export const AssetBootFragment = gql`
  ${AssetFragment}
  fragment AssetBoot on AssetBoot {
    id
    createdAt
    updateAt
    assets {
      ...AssetFragment
    }
  }
`;
