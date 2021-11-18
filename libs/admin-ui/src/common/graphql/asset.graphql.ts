import { gql } from '@apollo/client';
export const generateSignature = gql`
  mutation generateSignature($publicId: String!) {
    signature(publicId: $publicId) {
      signature
      timestamp
    }
  }
`;

export const deleteResource = gql`
  mutation deleteResource($publicId: String) {
    deleteResource(publicId: $publicId)
  }
`;
