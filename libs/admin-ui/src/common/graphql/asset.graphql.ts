import { gql } from '@apollo/client';
import { AssetFragment } from './fragments/asset.graphql';
export const generateSignature = gql`
  mutation generateSignature($publicId: String) {
    signature(publicId: $publicId) {
      signature
      timestamp
    }
  }
`;

export const deleteResource = gql`
  ${AssetFragment}
  mutation deleteResource($input: DeleteAssetInput!) {
    deleteResource(input: $input) {
      __typename
      ... on Asset {
        ...AssetFragment
      }
      ... on AssetBoot {
        id
        assets {
          ...AssetFragment
        }
      }
    }
  }
`;

export const createResource = gql`
  ${AssetFragment}
  mutation createResource($resource: AssetInput!) {
    createResource(resource: $resource) {
      __typename
      ... on Asset {
        ...AssetFragment
      }
      ... on AssetBoot {
        id
        assets {
          ...AssetFragment
        }
      }
    }
  }
`;

export const updateResource = gql`
  mutation editResource($resource: AssetEditInput!) {
    editResource(resource: $resource) {
      ...AssetFragment
    }
  }
`;
