// tslint:disable
// this file is generate pls not edit manually :)
import { SafeAny } from '@wellness/common';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: SafeAny;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: SafeAny;
};

export type Activity = {
  __typename?: 'Activity';
  createdAt: Scalars['DateTime'];
  detail: Detail;
  id: Scalars['ID'];
  updateAt: Scalars['DateTime'];
};

export type ActivityInput = {
  detail: DetailInput;
  duration: Scalars['Int'];
  mode: ModeSuscription;
  startAt?: InputMaybe<Scalars['DateTime']>;
  visible: Scalars['Boolean'];
};

export type Asistence = {
  __typename?: 'Asistence';
  client: Client;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  note: Scalars['String'];
  updateAt: Scalars['DateTime'];
};

export type Asset = {
  __typename?: 'Asset';
  boot?: Maybe<AssetBoot>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  updateAt: Scalars['DateTime'];
};

export type AssetBoot = {
  __typename?: 'AssetBoot';
  assets: Array<Maybe<Asset>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updateAt: Scalars['DateTime'];
};

export type AssetInput = {
  isMultiple: Scalars['Boolean'];
  metadata?: InputMaybe<Scalars['JSONObject']>;
  metadatas?: InputMaybe<Array<Scalars['JSONObject']>>;
};

export type Client = {
  __typename?: 'Client';
  birth?: Maybe<Scalars['DateTime']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  direction?: Maybe<Scalars['String']>;
  dni: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  mode: ModeRegiser;
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Asset>;
  sex: Sex;
  updateAt: Scalars['DateTime'];
};

export type ClientInput = {
  birthday?: InputMaybe<Scalars['DateTime']>;
  code?: InputMaybe<Scalars['String']>;
  direction: Scalars['String'];
  dni: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  modeRegister: ModeRegiser;
  name: Scalars['String'];
  note: Scalars['String'];
  phone: Scalars['String'];
  photoId?: InputMaybe<Scalars['Int']>;
  sex: Sex;
};

export type Contract = {
  __typename?: 'Contract';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  paid: Scalars['Boolean'];
  price: Scalars['Float'];
  updateAt: Scalars['DateTime'];
};

export type ContractInput = {
  activityId?: InputMaybe<Scalars['ID']>;
  clientId: Scalars['Float'];
  note?: InputMaybe<Scalars['String']>;
  paid: Scalars['Boolean'];
  planId?: InputMaybe<Scalars['ID']>;
  price: Scalars['Float'];
};

export type DeleteAssetInput = {
  id: Scalars['ID'];
  isMultiple: Scalars['Boolean'];
};

export type Detail = {
  __typename?: 'Detail';
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type DetailInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type InputAsistence = {
  clientId: Scalars['ID'];
  note?: InputMaybe<Scalars['ID']>;
};

export enum ModeRegiser {
  ADMIN = 'ADMIN',
  SELF = 'SELF',
}

/** This enum determine the mode of a suscription */
export enum ModeSuscription {
  DINAMIC = 'DINAMIC',
  FIXED = 'FIXED',
}

export type Mutation = {
  __typename?: 'Mutation';
  createActivity: Activity;
  createAsistence: Asistence;
  createPlan: Plan;
  createResource: ResourceUnion;
  deleteActivity: Activity;
  deleteAsistence: Scalars['Boolean'];
  deleteCLient: Client;
  deletePlan: Plan;
  deleteResource: ResourceUnion;
  joinActivity: Contract;
  joinPlan: Scalars['Boolean'];
  registerClient: Client;
  signature: ResponseSignature;
  updateAsistence: Asistence;
  updateCLient: Client;
};

export type MutationCreateActivityArgs = {
  input: ActivityInput;
};

export type MutationCreateAsistenceArgs = {
  asistence: InputAsistence;
};

export type MutationCreatePlanArgs = {
  input: PlanInput;
};

export type MutationCreateResourceArgs = {
  resource: AssetInput;
};

export type MutationDeleteActivityArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteAsistenceArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteCLientArgs = {
  id: Scalars['ID'];
};

export type MutationDeletePlanArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteResourceArgs = {
  input: DeleteAssetInput;
};

export type MutationJoinActivityArgs = {
  contract: ContractInput;
};

export type MutationJoinPlanArgs = {
  contract: ContractInput;
};

export type MutationRegisterClientArgs = {
  client: ClientInput;
};

export type MutationSignatureArgs = {
  publicId?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateAsistenceArgs = {
  id: Scalars['ID'];
  input: InputAsistence;
};

export type MutationUpdateCLientArgs = {
  id: Scalars['ID'];
  input: ClientInput;
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['DateTime'];
  detail: Detail;
  id: Scalars['ID'];
  updateAt: Scalars['DateTime'];
  visible: Scalars['Boolean'];
};

export type PlanInput = {
  detail: DetailInput;
  duration: Scalars['Int'];
  visible: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Activity>;
  client: Client;
  clients: Array<Client>;
  ping: Scalars['String'];
};

export type QueryActivitiesArgs = {
  id: Scalars['ID'];
};

export type QueryClientArgs = {
  id: Scalars['ID'];
};

export type ResourceUnion = Asset | AssetBoot;

export type ResponseSignature = {
  __typename?: 'ResponseSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Float'];
};

export enum Sex {
  MEN = 'MEN',
  OTHER = 'OTHER',
  WOMEN = 'WOMEN',
}

export type GenerateSignatureMutationVariables = Exact<{
  publicId?: Maybe<Scalars['String']>;
}>;

export type GenerateSignatureMutation = {
  __typename?: 'Mutation';
  signature: {
    __typename?: 'ResponseSignature';
    signature: string;
    timestamp: number;
  };
};

export type DeleteResourceMutationVariables = Exact<{
  input: DeleteAssetInput;
}>;

export type DeleteResourceMutation = {
  __typename?: 'Mutation';
  deleteResource:
    | {
        __typename: 'Asset';
        name: string;
        size?: number | null | undefined;
        previewUrl?: string | null | undefined;
        id: string;
        createdAt: SafeAny;
        updateAt: SafeAny;
      }
    | {
        __typename: 'AssetBoot';
        id: string;
        assets: Array<
          | {
              __typename?: 'Asset';
              name: string;
              size?: number | null | undefined;
              previewUrl?: string | null | undefined;
              id: string;
              createdAt: SafeAny;
              updateAt: SafeAny;
            }
          | null
          | undefined
        >;
      };
};

export type CreateResourceMutationVariables = Exact<{
  resource: AssetInput;
}>;

export type CreateResourceMutation = {
  __typename?: 'Mutation';
  createResource:
    | {
        __typename: 'Asset';
        name: string;
        size?: number | null | undefined;
        previewUrl?: string | null | undefined;
        id: string;
        createdAt: SafeAny;
        updateAt: SafeAny;
      }
    | {
        __typename: 'AssetBoot';
        id: string;
        assets: Array<
          | {
              __typename?: 'Asset';
              name: string;
              size?: number | null | undefined;
              previewUrl?: string | null | undefined;
              id: string;
              createdAt: SafeAny;
              updateAt: SafeAny;
            }
          | null
          | undefined
        >;
      };
};

export type RegisterClientMutationVariables = Exact<{
  client: ClientInput;
}>;

export type RegisterClientMutation = {
  __typename?: 'Mutation';
  registerClient: {
    __typename?: 'Client';
    id: string;
    code: string;
    dni: string;
    email: string;
    name: string;
    lastName: string;
    birth?: SafeAny | null | undefined;
    phone?: string | null | undefined;
    direction?: string | null | undefined;
    sex: Sex;
    mode: ModeRegiser;
    photo?:
      | {
          __typename?: 'Asset';
          name: string;
          size?: number | null | undefined;
          previewUrl?: string | null | undefined;
          id: string;
          createdAt: SafeAny;
          updateAt: SafeAny;
        }
      | null
      | undefined;
  };
};

export type GetClientsQueryVariables = Exact<{ [key: string]: never }>;

export type GetClientsQuery = {
  __typename?: 'Query';
  clients: Array<{
    __typename?: 'Client';
    id: string;
    code: string;
    dni: string;
    email: string;
    name: string;
    lastName: string;
    birth?: SafeAny | null | undefined;
    phone?: string | null | undefined;
    direction?: string | null | undefined;
    sex: Sex;
    mode: ModeRegiser;
    photo?:
      | {
          __typename?: 'Asset';
          name: string;
          size?: number | null | undefined;
          previewUrl?: string | null | undefined;
          id: string;
          createdAt: SafeAny;
          updateAt: SafeAny;
        }
      | null
      | undefined;
  }>;
};

export type GetClientQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetClientQuery = {
  __typename?: 'Query';
  client: {
    __typename?: 'Client';
    id: string;
    code: string;
    dni: string;
    email: string;
    name: string;
    lastName: string;
    birth?: SafeAny | null | undefined;
    phone?: string | null | undefined;
    direction?: string | null | undefined;
    sex: Sex;
    mode: ModeRegiser;
    photo?:
      | {
          __typename?: 'Asset';
          name: string;
          size?: number | null | undefined;
          previewUrl?: string | null | undefined;
          id: string;
          createdAt: SafeAny;
          updateAt: SafeAny;
        }
      | null
      | undefined;
  };
};

export type AssetFragmentFragment = {
  __typename?: 'Asset';
  name: string;
  size?: number | null | undefined;
  previewUrl?: string | null | undefined;
  id: string;
  createdAt: SafeAny;
  updateAt: SafeAny;
};

export type ClientFragmentFragment = {
  __typename?: 'Client';
  id: string;
  code: string;
  dni: string;
  email: string;
  name: string;
  lastName: string;
  birth?: SafeAny | null | undefined;
  phone?: string | null | undefined;
  direction?: string | null | undefined;
  sex: Sex;
  mode: ModeRegiser;
  photo?:
    | {
        __typename?: 'Asset';
        name: string;
        size?: number | null | undefined;
        previewUrl?: string | null | undefined;
        id: string;
        createdAt: SafeAny;
        updateAt: SafeAny;
      }
    | null
    | undefined;
};

export type PingQueryQueryVariables = Exact<{ [key: string]: never }>;

export type PingQueryQuery = { __typename?: 'Query'; ping: string };

export const AssetFragmentFragmentDoc = gql`
  fragment AssetFragment on Asset {
    name
    size
    previewUrl
    id
    createdAt
    updateAt
  }
`;
export const ClientFragmentFragmentDoc = gql`
  fragment ClientFragment on Client {
    id
    code
    dni
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
  ${AssetFragmentFragmentDoc}
`;
export const GenerateSignatureDocument = gql`
  mutation generateSignature($publicId: String) {
    signature(publicId: $publicId) {
      signature
      timestamp
    }
  }
`;
export type GenerateSignatureMutationFn = Apollo.MutationFunction<
  GenerateSignatureMutation,
  GenerateSignatureMutationVariables
>;

/**
 * __useGenerateSignatureMutation__
 *
 * To run a mutation, you first call `useGenerateSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateSignatureMutation, { data, loading, error }] = useGenerateSignatureMutation({
 *   variables: {
 *      publicId: // value for 'publicId'
 *   },
 * });
 */
export function useGenerateSignatureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateSignatureMutation,
    GenerateSignatureMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateSignatureMutation,
    GenerateSignatureMutationVariables
  >(GenerateSignatureDocument, options);
}
export type GenerateSignatureMutationHookResult = ReturnType<
  typeof useGenerateSignatureMutation
>;
export type GenerateSignatureMutationResult =
  Apollo.MutationResult<GenerateSignatureMutation>;
export type GenerateSignatureMutationOptions = Apollo.BaseMutationOptions<
  GenerateSignatureMutation,
  GenerateSignatureMutationVariables
>;
export const DeleteResourceDocument = gql`
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
  ${AssetFragmentFragmentDoc}
`;
export type DeleteResourceMutationFn = Apollo.MutationFunction<
  DeleteResourceMutation,
  DeleteResourceMutationVariables
>;

/**
 * __useDeleteResourceMutation__
 *
 * To run a mutation, you first call `useDeleteResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResourceMutation, { data, loading, error }] = useDeleteResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteResourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteResourceMutation,
    DeleteResourceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteResourceMutation,
    DeleteResourceMutationVariables
  >(DeleteResourceDocument, options);
}
export type DeleteResourceMutationHookResult = ReturnType<
  typeof useDeleteResourceMutation
>;
export type DeleteResourceMutationResult =
  Apollo.MutationResult<DeleteResourceMutation>;
export type DeleteResourceMutationOptions = Apollo.BaseMutationOptions<
  DeleteResourceMutation,
  DeleteResourceMutationVariables
>;
export const CreateResourceDocument = gql`
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
  ${AssetFragmentFragmentDoc}
`;
export type CreateResourceMutationFn = Apollo.MutationFunction<
  CreateResourceMutation,
  CreateResourceMutationVariables
>;

/**
 * __useCreateResourceMutation__
 *
 * To run a mutation, you first call `useCreateResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResourceMutation, { data, loading, error }] = useCreateResourceMutation({
 *   variables: {
 *      resource: // value for 'resource'
 *   },
 * });
 */
export function useCreateResourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateResourceMutation,
    CreateResourceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateResourceMutation,
    CreateResourceMutationVariables
  >(CreateResourceDocument, options);
}
export type CreateResourceMutationHookResult = ReturnType<
  typeof useCreateResourceMutation
>;
export type CreateResourceMutationResult =
  Apollo.MutationResult<CreateResourceMutation>;
export type CreateResourceMutationOptions = Apollo.BaseMutationOptions<
  CreateResourceMutation,
  CreateResourceMutationVariables
>;
export const RegisterClientDocument = gql`
  mutation registerClient($client: ClientInput!) {
    registerClient(client: $client) {
      ...ClientFragment
    }
  }
  ${ClientFragmentFragmentDoc}
`;
export type RegisterClientMutationFn = Apollo.MutationFunction<
  RegisterClientMutation,
  RegisterClientMutationVariables
>;

/**
 * __useRegisterClientMutation__
 *
 * To run a mutation, you first call `useRegisterClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerClientMutation, { data, loading, error }] = useRegisterClientMutation({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useRegisterClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterClientMutation,
    RegisterClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RegisterClientMutation,
    RegisterClientMutationVariables
  >(RegisterClientDocument, options);
}
export type RegisterClientMutationHookResult = ReturnType<
  typeof useRegisterClientMutation
>;
export type RegisterClientMutationResult =
  Apollo.MutationResult<RegisterClientMutation>;
export type RegisterClientMutationOptions = Apollo.BaseMutationOptions<
  RegisterClientMutation,
  RegisterClientMutationVariables
>;
export const GetClientsDocument = gql`
  query getClients {
    clients {
      ...ClientFragment
    }
  }
  ${ClientFragmentFragmentDoc}
`;

/**
 * __useGetClientsQuery__
 *
 * To run a query within a React component, call `useGetClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetClientsQuery,
    GetClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClientsQuery, GetClientsQueryVariables>(
    GetClientsDocument,
    options
  );
}
export function useGetClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClientsQuery,
    GetClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClientsQuery, GetClientsQueryVariables>(
    GetClientsDocument,
    options
  );
}
export type GetClientsQueryHookResult = ReturnType<typeof useGetClientsQuery>;
export type GetClientsLazyQueryHookResult = ReturnType<
  typeof useGetClientsLazyQuery
>;
export type GetClientsQueryResult = Apollo.QueryResult<
  GetClientsQuery,
  GetClientsQueryVariables
>;
export const GetClientDocument = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      ...ClientFragment
    }
  }
  ${ClientFragmentFragmentDoc}
`;

/**
 * __useGetClientQuery__
 *
 * To run a query within a React component, call `useGetClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClientQuery(
  baseOptions: Apollo.QueryHookOptions<GetClientQuery, GetClientQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClientQuery, GetClientQueryVariables>(
    GetClientDocument,
    options
  );
}
export function useGetClientLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClientQuery,
    GetClientQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClientQuery, GetClientQueryVariables>(
    GetClientDocument,
    options
  );
}
export type GetClientQueryHookResult = ReturnType<typeof useGetClientQuery>;
export type GetClientLazyQueryHookResult = ReturnType<
  typeof useGetClientLazyQuery
>;
export type GetClientQueryResult = Apollo.QueryResult<
  GetClientQuery,
  GetClientQueryVariables
>;
export const PingQueryDocument = gql`
  query pingQuery {
    ping
  }
`;

/**
 * __usePingQueryQuery__
 *
 * To run a query within a React component, call `usePingQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<PingQueryQuery, PingQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PingQueryQuery, PingQueryQueryVariables>(
    PingQueryDocument,
    options
  );
}
export function usePingQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PingQueryQuery,
    PingQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PingQueryQuery, PingQueryQueryVariables>(
    PingQueryDocument,
    options
  );
}
export type PingQueryQueryHookResult = ReturnType<typeof usePingQueryQuery>;
export type PingQueryLazyQueryHookResult = ReturnType<
  typeof usePingQueryLazyQuery
>;
export type PingQueryQueryResult = Apollo.QueryResult<
  PingQueryQuery,
  PingQueryQueryVariables
>;
type DiscriminateUnion<T, U> = T extends U ? T : never;

export type GenerateSignatureVariables = GenerateSignatureMutationVariables;
export type GenerateSignatureSignature = NonNullable<
  GenerateSignatureMutation['signature']
>;
export type DeleteResourceVariables = DeleteResourceMutationVariables;
export type DeleteResourceDeleteResource = NonNullable<
  DeleteResourceMutation['deleteResource']
>;
export type DeleteResourceAssetInlineFragment = DiscriminateUnion<
  NonNullable<DeleteResourceMutation['deleteResource']>,
  { __typename?: 'Asset' }
>;
export type DeleteResourceAssetBootInlineFragment = DiscriminateUnion<
  NonNullable<DeleteResourceMutation['deleteResource']>,
  { __typename?: 'AssetBoot' }
>;
export type DeleteResourceAssets = NonNullable<
  NonNullable<
    DiscriminateUnion<
      NonNullable<DeleteResourceMutation['deleteResource']>,
      { __typename?: 'AssetBoot' }
    >['assets']
  >[number]
>;
export type CreateResourceVariables = CreateResourceMutationVariables;
export type CreateResourceCreateResource = NonNullable<
  CreateResourceMutation['createResource']
>;
export type CreateResourceAssetInlineFragment = DiscriminateUnion<
  NonNullable<CreateResourceMutation['createResource']>,
  { __typename?: 'Asset' }
>;
export type CreateResourceAssetBootInlineFragment = DiscriminateUnion<
  NonNullable<CreateResourceMutation['createResource']>,
  { __typename?: 'AssetBoot' }
>;
export type CreateResourceAssets = NonNullable<
  NonNullable<
    DiscriminateUnion<
      NonNullable<CreateResourceMutation['createResource']>,
      { __typename?: 'AssetBoot' }
    >['assets']
  >[number]
>;
export type RegisterClientVariables = RegisterClientMutationVariables;
export type RegisterClientRegisterClient = NonNullable<
  RegisterClientMutation['registerClient']
>;
export type GetClientsVariables = GetClientsQueryVariables;
export type GetClientsClients = NonNullable<
  NonNullable<GetClientsQuery['clients']>[number]
>;
export type GetClientVariables = GetClientQueryVariables;
export type GetClientClient = NonNullable<GetClientQuery['client']>;
export type ClientFragmentPhoto = NonNullable<ClientFragmentFragment['photo']>;
export type PingQueryVariables = PingQueryQueryVariables;
