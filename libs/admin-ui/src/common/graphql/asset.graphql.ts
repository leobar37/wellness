import { gql } from '@apollo/client';
export const generateSignature = gql`
  mutation generateSignature($publicId: String!) {
    signature(publicId: $publicId) {
      signature
      timestamp
    }
  }
`;
