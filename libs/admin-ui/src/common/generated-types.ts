// tslint:disable
// this file is generate pls not edit manually :)
import { SafeAny} from '@wellness/common'
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: SafeAny;
};

export type Activity = {
  __typename?: 'Activity';
  detail: Detail;
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
  note: Scalars['String'];
};

export type Asset = {
  __typename?: 'Asset';
  boot?: Maybe<AssetBoot>;
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
};

export type AssetBoot = {
  __typename?: 'AssetBoot';
  assets: Array<Maybe<Asset>>;
};

export type Client = {
  __typename?: 'Client';
  birth: Scalars['DateTime'];
  code: Scalars['String'];
  direction?: Maybe<Scalars['String']>;
  dni: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  mode: ModeRegiser;
  name: Scalars['String'];
  phone: Scalars['DateTime'];
  sex: Sex;
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
  sex: Sex;
};

export type Contract = {
  __typename?: 'Contract';
  paid: Scalars['Boolean'];
  price: Scalars['Float'];
};

export type ContractInput = {
  activityId?: InputMaybe<Scalars['ID']>;
  clientId: Scalars['Float'];
  note?: InputMaybe<Scalars['String']>;
  paid: Scalars['Boolean'];
  planId?: InputMaybe<Scalars['ID']>;
  price: Scalars['Float'];
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
  SELF = 'SELF'
}

/** This enum determine the mode of a suscription */
export enum ModeSuscription {
  DINAMIC = 'DINAMIC',
  FIXED = 'FIXED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createActivity: Activity;
  createAsistence: Asistence;
  createPlan: Plan;
  deleteActivity: Activity;
  deleteAsistence: Scalars['Boolean'];
  deleteCLient: Client;
  deletePlan: Plan;
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
  publicId: Scalars['String'];
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
  detail: Detail;
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
  clients: Array<Client>;
  ping: Scalars['String'];
};


export type QueryActivitiesArgs = {
  id: Scalars['ID'];
};

export type ResponseSignature = {
  __typename?: 'ResponseSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Float'];
};

export enum Sex {
  MEN = 'MEN',
  OTHER = 'OTHER',
  WOMEN = 'WOMEN'
}

export type GenerateSignatureMutationVariables = Exact<{
  publicId: Scalars['String'];
}>;


export type GenerateSignatureMutation = { __typename?: 'Mutation', signature: { __typename?: 'ResponseSignature', signature: string, timestamp: number } };

export type RegisterClientMutationVariables = Exact<{
  client: ClientInput;
}>;


export type RegisterClientMutation = { __typename?: 'Mutation', registerClient: { __typename?: 'Client', code: string, dni: string, email: string, name: string, lastName: string, birth: SafeAny, phone: SafeAny, direction?: string | null | undefined, sex: Sex, mode: ModeRegiser } };

export type ClientFragmentFragment = { __typename?: 'Client', code: string, dni: string, email: string, name: string, lastName: string, birth: SafeAny, phone: SafeAny, direction?: string | null | undefined, sex: Sex, mode: ModeRegiser };

export type PingQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQueryQuery = { __typename?: 'Query', ping: string };

export const ClientFragmentFragmentDoc = gql`
    fragment ClientFragment on Client {
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
}
    `;
export const GenerateSignatureDocument = gql`
    mutation generateSignature($publicId: String!) {
  signature(publicId: $publicId) {
    signature
    timestamp
  }
}
    `;
export type GenerateSignatureMutationFn = Apollo.MutationFunction<GenerateSignatureMutation, GenerateSignatureMutationVariables>;

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
export function useGenerateSignatureMutation(baseOptions?: Apollo.MutationHookOptions<GenerateSignatureMutation, GenerateSignatureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateSignatureMutation, GenerateSignatureMutationVariables>(GenerateSignatureDocument, options);
      }
export type GenerateSignatureMutationHookResult = ReturnType<typeof useGenerateSignatureMutation>;
export type GenerateSignatureMutationResult = Apollo.MutationResult<GenerateSignatureMutation>;
export type GenerateSignatureMutationOptions = Apollo.BaseMutationOptions<GenerateSignatureMutation, GenerateSignatureMutationVariables>;
export const RegisterClientDocument = gql`
    mutation registerClient($client: ClientInput!) {
  registerClient(client: $client) {
    ...ClientFragment
  }
}
    ${ClientFragmentFragmentDoc}`;
export type RegisterClientMutationFn = Apollo.MutationFunction<RegisterClientMutation, RegisterClientMutationVariables>;

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
export function useRegisterClientMutation(baseOptions?: Apollo.MutationHookOptions<RegisterClientMutation, RegisterClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterClientMutation, RegisterClientMutationVariables>(RegisterClientDocument, options);
      }
export type RegisterClientMutationHookResult = ReturnType<typeof useRegisterClientMutation>;
export type RegisterClientMutationResult = Apollo.MutationResult<RegisterClientMutation>;
export type RegisterClientMutationOptions = Apollo.BaseMutationOptions<RegisterClientMutation, RegisterClientMutationVariables>;
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
export function usePingQueryQuery(baseOptions?: Apollo.QueryHookOptions<PingQueryQuery, PingQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PingQueryQuery, PingQueryQueryVariables>(PingQueryDocument, options);
      }
export function usePingQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQueryQuery, PingQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PingQueryQuery, PingQueryQueryVariables>(PingQueryDocument, options);
        }
export type PingQueryQueryHookResult = ReturnType<typeof usePingQueryQuery>;
export type PingQueryLazyQueryHookResult = ReturnType<typeof usePingQueryLazyQuery>;
export type PingQueryQueryResult = Apollo.QueryResult<PingQueryQuery, PingQueryQueryVariables>;
export type GenerateSignatureVariables = GenerateSignatureMutationVariables;
export type GenerateSignatureSignature = (NonNullable<GenerateSignatureMutation['signature']>);
export type RegisterClientVariables = RegisterClientMutationVariables;
export type RegisterClientRegisterClient = (NonNullable<RegisterClientMutation['registerClient']>);
export type PingQueryVariables = PingQueryQueryVariables;