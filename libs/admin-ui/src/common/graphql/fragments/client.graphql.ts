import { gql } from '@apollo/client';
import { AssetFragment } from './asset.graphql';

export const ClientFragment = gql`
  ${AssetFragment}
  fragment ClientFragment on Client {
    id
    code
    dni
    createdAt
    email
    name
    lastName
    birth
    phone
    direction
    sex
    mode
    photo {
      ...AssetFragment
    }
  }
`;
