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

export type IActivity = {
  __typename?: 'Activity';
  detail: IDetail;
};

export type IActivityInput = {
  detail: IDetailInput;
  duration: Scalars['Int'];
  mode: IModeSuscription;
  startAt?: InputMaybe<Scalars['DateTime']>;
  visible: Scalars['Boolean'];
};

export type IAsistence = {
  __typename?: 'Asistence';
  client: IClient;
  note: Scalars['String'];
};

export type IClient = {
  __typename?: 'Client';
  birth: Scalars['DateTime'];
  code: Scalars['String'];
  direction?: Maybe<Scalars['String']>;
  dni: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  mode: IModeRegiser;
  name: Scalars['String'];
  phone: Scalars['DateTime'];
  sex: ISex;
};

export type IClientInput = {
  birthday?: InputMaybe<Scalars['DateTime']>;
  code?: InputMaybe<Scalars['String']>;
  direction: Scalars['String'];
  dni: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  modeRegister: IModeRegiser;
  name: Scalars['String'];
  note: Scalars['String'];
  sex: ISex;
};

export type IContract = {
  __typename?: 'Contract';
  paid: Scalars['Boolean'];
  price: Scalars['Float'];
};

export type IContractInput = {
  activityId?: InputMaybe<Scalars['ID']>;
  clientId: Scalars['Float'];
  note?: InputMaybe<Scalars['String']>;
  paid: Scalars['Boolean'];
  planId?: InputMaybe<Scalars['ID']>;
  price: Scalars['Float'];
};

export type IDetail = {
  __typename?: 'Detail';
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type IDetailInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type IInputAsistence = {
  clientId: Scalars['ID'];
  note?: InputMaybe<Scalars['ID']>;
};

export enum IModeRegiser {
  ADMIN = 'ADMIN',
  SELF = 'SELF'
}

/** This enum determine the mode of a suscription */
export enum IModeSuscription {
  DINAMIC = 'DINAMIC',
  FIXED = 'FIXED'
}

export type IMutation = {
  __typename?: 'Mutation';
  createActivity: IActivity;
  createAsistence: IAsistence;
  createPlan: IPlan;
  deleteActivity: IActivity;
  deleteAsistence: Scalars['Boolean'];
  deleteCLient: IClient;
  deletePlan: IPlan;
  joinActivity: IContract;
  joinPlan: Scalars['Boolean'];
  registerClient: IClient;
  updateAsistence: IAsistence;
  updateCLient: IClient;
};


export type IMutationCreateActivityArgs = {
  input: IActivityInput;
};


export type IMutationCreateAsistenceArgs = {
  asistence: IInputAsistence;
};


export type IMutationCreatePlanArgs = {
  input: IPlanInput;
};


export type IMutationDeleteActivityArgs = {
  id: Scalars['ID'];
};


export type IMutationDeleteAsistenceArgs = {
  id: Scalars['ID'];
};


export type IMutationDeleteCLientArgs = {
  id: Scalars['ID'];
};


export type IMutationDeletePlanArgs = {
  id: Scalars['ID'];
};


export type IMutationJoinActivityArgs = {
  contract: IContractInput;
};


export type IMutationJoinPlanArgs = {
  contract: IContractInput;
};


export type IMutationRegisterClientArgs = {
  client: IClientInput;
};


export type IMutationUpdateAsistenceArgs = {
  id: Scalars['ID'];
  input: IInputAsistence;
};


export type IMutationUpdateCLientArgs = {
  id: Scalars['ID'];
  input: IClientInput;
};

export type IPlan = {
  __typename?: 'Plan';
  detail: IDetail;
  visible: Scalars['Boolean'];
};

export type IPlanInput = {
  detail: IDetailInput;
  duration: Scalars['Int'];
  visible: Scalars['Boolean'];
};

export type IQuery = {
  __typename?: 'Query';
  activities: Array<IActivity>;
  clients: Array<IClient>;
  ping: Scalars['String'];
};


export type IQueryActivitiesArgs = {
  id: Scalars['ID'];
};

export enum ISex {
  MEN = 'MEN',
  OTHER = 'OTHER',
  WOMEN = 'WOMEN'
}

export type IPingQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IPingQueryQuery = { __typename?: 'Query', ping: string };


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
export function usePingQueryQuery(baseOptions?: Apollo.QueryHookOptions<IPingQueryQuery, IPingQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IPingQueryQuery, IPingQueryQueryVariables>(PingQueryDocument, options);
      }
export function usePingQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IPingQueryQuery, IPingQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IPingQueryQuery, IPingQueryQueryVariables>(PingQueryDocument, options);
        }
export type PingQueryQueryHookResult = ReturnType<typeof usePingQueryQuery>;
export type PingQueryLazyQueryHookResult = ReturnType<typeof usePingQueryLazyQuery>;
export type PingQueryQueryResult = Apollo.QueryResult<IPingQueryQuery, IPingQueryQueryVariables>;