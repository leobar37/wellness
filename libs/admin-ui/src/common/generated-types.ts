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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: SafeAny;
};

export type Activity = {
  __typename?: 'Activity';
  createdAt: Scalars['DateTime'];
  detail: Detail;
  id: Scalars['ID'];
  suscription: Suscription;
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
  client?: Maybe<Client>;
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
  bootId?: InputMaybe<Scalars['String']>;
  isMultiple: Scalars['Boolean'];
  metadata?: InputMaybe<Scalars['JSONObject']>;
  metadatas?: InputMaybe<Array<Scalars['JSONObject']>>;
};

export type Client = {
  __typename?: 'Client';
  birth?: Maybe<Scalars['DateTime']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currentFicha?: Maybe<Ficha>;
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

export type DetailFicha = {
  __typename?: 'DetailFicha';
  asset?: Maybe<AssetBoot>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  objective?: Maybe<Scalars['String']>;
  open: Scalars['Boolean'];
  updateAt: Scalars['DateTime'];
  weight: Scalars['Float'];
};

export type DetailInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Ficha = {
  __typename?: 'Ficha';
  client: Client;
  closed: Scalars['Boolean'];
  closedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  details: Array<DetailFicha>;
  id: Scalars['ID'];
  updateAt: Scalars['DateTime'];
};

export type FichaInput = {
  /** This images of the ficha */
  assetId: Scalars['Float'];
  clientId?: InputMaybe<Scalars['Int']>;
  /** When this is null , close the ficha */
  fichaId?: InputMaybe<Scalars['ID']>;
  note?: InputMaybe<Scalars['String']>;
  objective?: InputMaybe<Scalars['String']>;
  open?: InputMaybe<Scalars['Boolean']>;
  weight: Scalars['Float'];
};

export type InputAsistence = {
  clientId: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
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
  createResource: ResourceUnion;
  deleteActivity: Activity;
  deleteAsistence: Asistence;
  deleteCLient: Client;
  deleteFicha: Ficha;
  deletePlan: Plan;
  deleteResource: ResourceUnion;
  joinActivity: Contract;
  joinPlan: Scalars['Boolean'];
  openAndCloseFicha: Ficha;
  registerClient: Client;
  signature: ResponseSignature;
  updateActivity: Activity;
  updateAsistence: Asistence;
  updateCLient: Client;
  updateFicha: Ficha;
  updatePlan: Plan;
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


export type MutationDeleteFichaArgs = {
  fichaId: Scalars['Int'];
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


export type MutationOpenAndCloseFichaArgs = {
  input: FichaInput;
};


export type MutationRegisterClientArgs = {
  client: ClientInput;
};


export type MutationSignatureArgs = {
  publicId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateActivityArgs = {
  id: Scalars['ID'];
  input: ActivityInput;
};


export type MutationUpdateAsistenceArgs = {
  id: Scalars['ID'];
  input: InputAsistence;
};


export type MutationUpdateCLientArgs = {
  id: Scalars['ID'];
  input: ClientInput;
};


export type MutationUpdateFichaArgs = {
  detailId: Scalars['Int'];
  input: FichaInput;
};


export type MutationUpdatePlanArgs = {
  id: Scalars['ID'];
  input: PlanInput;
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['DateTime'];
  detail: Detail;
  id: Scalars['ID'];
  suscription: Suscription;
  updateAt: Scalars['DateTime'];
  visible: Scalars['Boolean'];
};

export type PlanInput = {
  /** Determine if a plan is active */
  active: Scalars['Boolean'];
  detail: DetailInput;
  duration: Scalars['Int'];
  /** Determine if this plan is visible for the users */
  visible: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  client: Client;
  clients: Array<Client>;
  finAsistences: Array<Asistence>;
  getActivities: Array<Activity>;
  getActivity: Activity;
  getFicha?: Maybe<Ficha>;
  getFichas?: Maybe<Array<Ficha>>;
  getPlan: Plan;
  getPlans: Array<Plan>;
  ping: Scalars['String'];
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryFinAsistencesArgs = {
  cliendId: Scalars['ID'];
};


export type QueryGetActivityArgs = {
  id: Scalars['ID'];
};


export type QueryGetFichaArgs = {
  userId: Scalars['Int'];
};


export type QueryGetFichasArgs = {
  userId: Scalars['Int'];
};


export type QueryGetPlanArgs = {
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
  WOMEN = 'WOMEN'
}

export type Suscription = {
  __typename?: 'Suscription';
  active: Scalars['Boolean'];
  contracts: Array<Maybe<Contract>>;
  createdAt: Scalars['DateTime'];
  duration: Scalars['Int'];
  finishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mode: ModeSuscription;
  startAt?: Maybe<Scalars['DateTime']>;
  updateAt: Scalars['DateTime'];
};

export type CreateAsistenceMutationVariables = Exact<{
  asistence: InputAsistence;
}>;


export type CreateAsistenceMutation = { __typename?: 'Mutation', createAsistence: { __typename?: 'Asistence', id: string, createdAt: SafeAny, updateAt: SafeAny, note: string } };

export type UpdateAsistenceMutationVariables = Exact<{
  input: InputAsistence;
  id: Scalars['ID'];
}>;


export type UpdateAsistenceMutation = { __typename?: 'Mutation', updateAsistence: { __typename?: 'Asistence', id: string, createdAt: SafeAny, updateAt: SafeAny, note: string } };

export type DeleteAsistenceMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAsistenceMutation = { __typename?: 'Mutation', deleteAsistence: { __typename?: 'Asistence', id: string, createdAt: SafeAny, updateAt: SafeAny, note: string } };

export type FindAsistencesQueryVariables = Exact<{
  cliendId: Scalars['ID'];
}>;


export type FindAsistencesQuery = { __typename?: 'Query', finAsistences: Array<{ __typename?: 'Asistence', id: string, createdAt: SafeAny, updateAt: SafeAny, note: string }> };

export type GenerateSignatureMutationVariables = Exact<{
  publicId?: Maybe<Scalars['String']>;
}>;


export type GenerateSignatureMutation = { __typename?: 'Mutation', signature: { __typename?: 'ResponseSignature', signature: string, timestamp: number } };

export type DeleteResourceMutationVariables = Exact<{
  input: DeleteAssetInput;
}>;


export type DeleteResourceMutation = { __typename?: 'Mutation', deleteResource: { __typename: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | { __typename: 'AssetBoot', id: string, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } };

export type CreateResourceMutationVariables = Exact<{
  resource: AssetInput;
}>;


export type CreateResourceMutation = { __typename?: 'Mutation', createResource: { __typename: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | { __typename: 'AssetBoot', id: string, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } };

export type RegisterClientMutationVariables = Exact<{
  client: ClientInput;
}>;


export type RegisterClientMutation = { __typename?: 'Mutation', registerClient: { __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny | null | undefined, phone?: string | null | undefined, direction?: string | null | undefined, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined } };

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny | null | undefined, phone?: string | null | undefined, direction?: string | null | undefined, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined }> };

export type GetClientQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetClientQuery = { __typename?: 'Query', client: { __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny | null | undefined, phone?: string | null | undefined, direction?: string | null | undefined, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined } };

export type OpenAndCloseMutationVariables = Exact<{
  input: FichaInput;
}>;


export type OpenAndCloseMutation = { __typename?: 'Mutation', openAndCloseFicha: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny | null | undefined, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string | null | undefined, note?: string | null | undefined, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } | null | undefined }> } };

export type GetFichaQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetFichaQuery = { __typename?: 'Query', getFicha?: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny | null | undefined, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string | null | undefined, note?: string | null | undefined, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } | null | undefined }> } | null | undefined };

export type GetFichasQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetFichasQuery = { __typename?: 'Query', getFichas?: Array<{ __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny | null | undefined, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string | null | undefined, note?: string | null | undefined, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } | null | undefined }> }> | null | undefined };

export type UpdateFichaMutationVariables = Exact<{
  input: FichaInput;
  detailId: Scalars['Int'];
}>;


export type UpdateFichaMutation = { __typename?: 'Mutation', updateFicha: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny | null | undefined, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string | null | undefined, note?: string | null | undefined, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } | null | undefined }> } };

export type DeleteFichaMutationVariables = Exact<{
  fichaId: Scalars['Int'];
}>;


export type DeleteFichaMutation = { __typename?: 'Mutation', deleteFicha: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny | null | undefined, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string | null | undefined, note?: string | null | undefined, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } | null | undefined }> } };

export type AsistenceFragmentFragment = { __typename?: 'Asistence', id: string, createdAt: SafeAny, updateAt: SafeAny, note: string };

export type AssetFragmentFragment = { __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny };

export type AssetBootFragment = { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> };

export type ClientFragmentFragment = { __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny | null | undefined, phone?: string | null | undefined, direction?: string | null | undefined, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined };

export type FichaFragmentFragment = { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny | null | undefined, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string | null | undefined, note?: string | null | undefined, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number | null | undefined, previewUrl?: string | null | undefined, id: string, createdAt: SafeAny, updateAt: SafeAny } | null | undefined> } | null | undefined }> };

export type DetailFragmentFragment = { __typename?: 'Detail', name: string, description: string, price: number };

export type PlanFragmentFragment = { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } };

export type SubscriptionFragmentFragment = { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined };

export type ActivityFragmentFragment = { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } };

export type PingQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQueryQuery = { __typename?: 'Query', ping: string };

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitiesQuery = { __typename?: 'Query', getActivities: Array<{ __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } }> };

export type CreateActivityMutationVariables = Exact<{
  input: ActivityInput;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export type GetActivityQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetActivityQuery = { __typename?: 'Query', getActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export type UpdateActivityMutationVariables = Exact<{
  input: ActivityInput;
  id: Scalars['ID'];
}>;


export type UpdateActivityMutation = { __typename?: 'Mutation', updateActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export type DeleteActivityMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export type GetPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlansQuery = { __typename?: 'Query', getPlans: Array<{ __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } }> };

export type GetPlanQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlanQuery = { __typename?: 'Query', getPlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export type DeletePlanMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export type UpdatePlanMutationVariables = Exact<{
  input: PlanInput;
  id: Scalars['ID'];
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export type CreatePlanMutationVariables = Exact<{
  input: PlanInput;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny | null | undefined, finishedAt?: SafeAny | null | undefined } } };

export const AsistenceFragmentFragmentDoc = gql`
    fragment asistenceFragment on Asistence {
  id
  createdAt
  updateAt
  note
}
    `;
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
    ${AssetFragmentFragmentDoc}`;
export const AssetBootFragmentDoc = gql`
    fragment AssetBoot on AssetBoot {
  id
  createdAt
  updateAt
  assets {
    ...AssetFragment
  }
}
    ${AssetFragmentFragmentDoc}`;
export const FichaFragmentFragmentDoc = gql`
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
    ${AssetBootFragmentDoc}`;
export const DetailFragmentFragmentDoc = gql`
    fragment DetailFragment on Detail {
  name
  description
  price
}
    `;
export const SubscriptionFragmentFragmentDoc = gql`
    fragment SubscriptionFragment on Suscription {
  id
  createdAt
  updateAt
  duration
  active
  mode
  startAt
  finishedAt
  startAt
}
    `;
export const PlanFragmentFragmentDoc = gql`
    fragment PlanFragment on Plan {
  id
  createdAt
  updateAt
  detail {
    ...DetailFragment
  }
  visible
  suscription {
    ...SubscriptionFragment
  }
}
    ${DetailFragmentFragmentDoc}
${SubscriptionFragmentFragmentDoc}`;
export const ActivityFragmentFragmentDoc = gql`
    fragment ActivityFragment on Activity {
  id
  createdAt
  updateAt
  detail {
    ...DetailFragment
  }
  suscription {
    ...SubscriptionFragment
  }
}
    ${DetailFragmentFragmentDoc}
${SubscriptionFragmentFragmentDoc}`;
export const CreateAsistenceDocument = gql`
    mutation createAsistence($asistence: InputAsistence!) {
  createAsistence(asistence: $asistence) {
    ...asistenceFragment
  }
}
    ${AsistenceFragmentFragmentDoc}`;
export type CreateAsistenceMutationFn = Apollo.MutationFunction<CreateAsistenceMutation, CreateAsistenceMutationVariables>;

/**
 * __useCreateAsistenceMutation__
 *
 * To run a mutation, you first call `useCreateAsistenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAsistenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAsistenceMutation, { data, loading, error }] = useCreateAsistenceMutation({
 *   variables: {
 *      asistence: // value for 'asistence'
 *   },
 * });
 */
export function useCreateAsistenceMutation(baseOptions?: Apollo.MutationHookOptions<CreateAsistenceMutation, CreateAsistenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAsistenceMutation, CreateAsistenceMutationVariables>(CreateAsistenceDocument, options);
      }
export type CreateAsistenceMutationHookResult = ReturnType<typeof useCreateAsistenceMutation>;
export type CreateAsistenceMutationResult = Apollo.MutationResult<CreateAsistenceMutation>;
export type CreateAsistenceMutationOptions = Apollo.BaseMutationOptions<CreateAsistenceMutation, CreateAsistenceMutationVariables>;
export const UpdateAsistenceDocument = gql`
    mutation updateAsistence($input: InputAsistence!, $id: ID!) {
  updateAsistence(input: $input, id: $id) {
    ...asistenceFragment
  }
}
    ${AsistenceFragmentFragmentDoc}`;
export type UpdateAsistenceMutationFn = Apollo.MutationFunction<UpdateAsistenceMutation, UpdateAsistenceMutationVariables>;

/**
 * __useUpdateAsistenceMutation__
 *
 * To run a mutation, you first call `useUpdateAsistenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAsistenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAsistenceMutation, { data, loading, error }] = useUpdateAsistenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateAsistenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAsistenceMutation, UpdateAsistenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAsistenceMutation, UpdateAsistenceMutationVariables>(UpdateAsistenceDocument, options);
      }
export type UpdateAsistenceMutationHookResult = ReturnType<typeof useUpdateAsistenceMutation>;
export type UpdateAsistenceMutationResult = Apollo.MutationResult<UpdateAsistenceMutation>;
export type UpdateAsistenceMutationOptions = Apollo.BaseMutationOptions<UpdateAsistenceMutation, UpdateAsistenceMutationVariables>;
export const DeleteAsistenceDocument = gql`
    mutation deleteAsistence($id: ID!) {
  deleteAsistence(id: $id) {
    ...asistenceFragment
  }
}
    ${AsistenceFragmentFragmentDoc}`;
export type DeleteAsistenceMutationFn = Apollo.MutationFunction<DeleteAsistenceMutation, DeleteAsistenceMutationVariables>;

/**
 * __useDeleteAsistenceMutation__
 *
 * To run a mutation, you first call `useDeleteAsistenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAsistenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAsistenceMutation, { data, loading, error }] = useDeleteAsistenceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAsistenceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAsistenceMutation, DeleteAsistenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAsistenceMutation, DeleteAsistenceMutationVariables>(DeleteAsistenceDocument, options);
      }
export type DeleteAsistenceMutationHookResult = ReturnType<typeof useDeleteAsistenceMutation>;
export type DeleteAsistenceMutationResult = Apollo.MutationResult<DeleteAsistenceMutation>;
export type DeleteAsistenceMutationOptions = Apollo.BaseMutationOptions<DeleteAsistenceMutation, DeleteAsistenceMutationVariables>;
export const FindAsistencesDocument = gql`
    query findAsistences($cliendId: ID!) {
  finAsistences(cliendId: $cliendId) {
    ...asistenceFragment
  }
}
    ${AsistenceFragmentFragmentDoc}`;

/**
 * __useFindAsistencesQuery__
 *
 * To run a query within a React component, call `useFindAsistencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAsistencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAsistencesQuery({
 *   variables: {
 *      cliendId: // value for 'cliendId'
 *   },
 * });
 */
export function useFindAsistencesQuery(baseOptions: Apollo.QueryHookOptions<FindAsistencesQuery, FindAsistencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAsistencesQuery, FindAsistencesQueryVariables>(FindAsistencesDocument, options);
      }
export function useFindAsistencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAsistencesQuery, FindAsistencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAsistencesQuery, FindAsistencesQueryVariables>(FindAsistencesDocument, options);
        }
export type FindAsistencesQueryHookResult = ReturnType<typeof useFindAsistencesQuery>;
export type FindAsistencesLazyQueryHookResult = ReturnType<typeof useFindAsistencesLazyQuery>;
export type FindAsistencesQueryResult = Apollo.QueryResult<FindAsistencesQuery, FindAsistencesQueryVariables>;
export const GenerateSignatureDocument = gql`
    mutation generateSignature($publicId: String) {
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
    ${AssetFragmentFragmentDoc}`;
export type DeleteResourceMutationFn = Apollo.MutationFunction<DeleteResourceMutation, DeleteResourceMutationVariables>;

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
export function useDeleteResourceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteResourceMutation, DeleteResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteResourceMutation, DeleteResourceMutationVariables>(DeleteResourceDocument, options);
      }
export type DeleteResourceMutationHookResult = ReturnType<typeof useDeleteResourceMutation>;
export type DeleteResourceMutationResult = Apollo.MutationResult<DeleteResourceMutation>;
export type DeleteResourceMutationOptions = Apollo.BaseMutationOptions<DeleteResourceMutation, DeleteResourceMutationVariables>;
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
    ${AssetFragmentFragmentDoc}`;
export type CreateResourceMutationFn = Apollo.MutationFunction<CreateResourceMutation, CreateResourceMutationVariables>;

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
export function useCreateResourceMutation(baseOptions?: Apollo.MutationHookOptions<CreateResourceMutation, CreateResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateResourceMutation, CreateResourceMutationVariables>(CreateResourceDocument, options);
      }
export type CreateResourceMutationHookResult = ReturnType<typeof useCreateResourceMutation>;
export type CreateResourceMutationResult = Apollo.MutationResult<CreateResourceMutation>;
export type CreateResourceMutationOptions = Apollo.BaseMutationOptions<CreateResourceMutation, CreateResourceMutationVariables>;
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
export const GetClientsDocument = gql`
    query getClients {
  clients {
    ...ClientFragment
  }
}
    ${ClientFragmentFragmentDoc}`;

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
export function useGetClientsQuery(baseOptions?: Apollo.QueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, options);
      }
export function useGetClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, options);
        }
export type GetClientsQueryHookResult = ReturnType<typeof useGetClientsQuery>;
export type GetClientsLazyQueryHookResult = ReturnType<typeof useGetClientsLazyQuery>;
export type GetClientsQueryResult = Apollo.QueryResult<GetClientsQuery, GetClientsQueryVariables>;
export const GetClientDocument = gql`
    query getClient($id: ID!) {
  client(id: $id) {
    ...ClientFragment
  }
}
    ${ClientFragmentFragmentDoc}`;

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
export function useGetClientQuery(baseOptions: Apollo.QueryHookOptions<GetClientQuery, GetClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, options);
      }
export function useGetClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientQuery, GetClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, options);
        }
export type GetClientQueryHookResult = ReturnType<typeof useGetClientQuery>;
export type GetClientLazyQueryHookResult = ReturnType<typeof useGetClientLazyQuery>;
export type GetClientQueryResult = Apollo.QueryResult<GetClientQuery, GetClientQueryVariables>;
export const OpenAndCloseDocument = gql`
    mutation openAndClose($input: FichaInput!) {
  openAndCloseFicha(input: $input) {
    ...fichaFragment
  }
}
    ${FichaFragmentFragmentDoc}`;
export type OpenAndCloseMutationFn = Apollo.MutationFunction<OpenAndCloseMutation, OpenAndCloseMutationVariables>;

/**
 * __useOpenAndCloseMutation__
 *
 * To run a mutation, you first call `useOpenAndCloseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenAndCloseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openAndCloseMutation, { data, loading, error }] = useOpenAndCloseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOpenAndCloseMutation(baseOptions?: Apollo.MutationHookOptions<OpenAndCloseMutation, OpenAndCloseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OpenAndCloseMutation, OpenAndCloseMutationVariables>(OpenAndCloseDocument, options);
      }
export type OpenAndCloseMutationHookResult = ReturnType<typeof useOpenAndCloseMutation>;
export type OpenAndCloseMutationResult = Apollo.MutationResult<OpenAndCloseMutation>;
export type OpenAndCloseMutationOptions = Apollo.BaseMutationOptions<OpenAndCloseMutation, OpenAndCloseMutationVariables>;
export const GetFichaDocument = gql`
    query getFicha($userId: Int!) {
  getFicha(userId: $userId) {
    ...fichaFragment
  }
}
    ${FichaFragmentFragmentDoc}`;

/**
 * __useGetFichaQuery__
 *
 * To run a query within a React component, call `useGetFichaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFichaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFichaQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetFichaQuery(baseOptions: Apollo.QueryHookOptions<GetFichaQuery, GetFichaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFichaQuery, GetFichaQueryVariables>(GetFichaDocument, options);
      }
export function useGetFichaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFichaQuery, GetFichaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFichaQuery, GetFichaQueryVariables>(GetFichaDocument, options);
        }
export type GetFichaQueryHookResult = ReturnType<typeof useGetFichaQuery>;
export type GetFichaLazyQueryHookResult = ReturnType<typeof useGetFichaLazyQuery>;
export type GetFichaQueryResult = Apollo.QueryResult<GetFichaQuery, GetFichaQueryVariables>;
export const GetFichasDocument = gql`
    query getFichas($userId: Int!) {
  getFichas(userId: $userId) {
    ...fichaFragment
  }
}
    ${FichaFragmentFragmentDoc}`;

/**
 * __useGetFichasQuery__
 *
 * To run a query within a React component, call `useGetFichasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFichasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFichasQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetFichasQuery(baseOptions: Apollo.QueryHookOptions<GetFichasQuery, GetFichasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFichasQuery, GetFichasQueryVariables>(GetFichasDocument, options);
      }
export function useGetFichasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFichasQuery, GetFichasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFichasQuery, GetFichasQueryVariables>(GetFichasDocument, options);
        }
export type GetFichasQueryHookResult = ReturnType<typeof useGetFichasQuery>;
export type GetFichasLazyQueryHookResult = ReturnType<typeof useGetFichasLazyQuery>;
export type GetFichasQueryResult = Apollo.QueryResult<GetFichasQuery, GetFichasQueryVariables>;
export const UpdateFichaDocument = gql`
    mutation updateFicha($input: FichaInput!, $detailId: Int!) {
  updateFicha(input: $input, detailId: $detailId) {
    ...fichaFragment
  }
}
    ${FichaFragmentFragmentDoc}`;
export type UpdateFichaMutationFn = Apollo.MutationFunction<UpdateFichaMutation, UpdateFichaMutationVariables>;

/**
 * __useUpdateFichaMutation__
 *
 * To run a mutation, you first call `useUpdateFichaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFichaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFichaMutation, { data, loading, error }] = useUpdateFichaMutation({
 *   variables: {
 *      input: // value for 'input'
 *      detailId: // value for 'detailId'
 *   },
 * });
 */
export function useUpdateFichaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFichaMutation, UpdateFichaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFichaMutation, UpdateFichaMutationVariables>(UpdateFichaDocument, options);
      }
export type UpdateFichaMutationHookResult = ReturnType<typeof useUpdateFichaMutation>;
export type UpdateFichaMutationResult = Apollo.MutationResult<UpdateFichaMutation>;
export type UpdateFichaMutationOptions = Apollo.BaseMutationOptions<UpdateFichaMutation, UpdateFichaMutationVariables>;
export const DeleteFichaDocument = gql`
    mutation deleteFicha($fichaId: Int!) {
  deleteFicha(fichaId: $fichaId) {
    ...fichaFragment
  }
}
    ${FichaFragmentFragmentDoc}`;
export type DeleteFichaMutationFn = Apollo.MutationFunction<DeleteFichaMutation, DeleteFichaMutationVariables>;

/**
 * __useDeleteFichaMutation__
 *
 * To run a mutation, you first call `useDeleteFichaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFichaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFichaMutation, { data, loading, error }] = useDeleteFichaMutation({
 *   variables: {
 *      fichaId: // value for 'fichaId'
 *   },
 * });
 */
export function useDeleteFichaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFichaMutation, DeleteFichaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFichaMutation, DeleteFichaMutationVariables>(DeleteFichaDocument, options);
      }
export type DeleteFichaMutationHookResult = ReturnType<typeof useDeleteFichaMutation>;
export type DeleteFichaMutationResult = Apollo.MutationResult<DeleteFichaMutation>;
export type DeleteFichaMutationOptions = Apollo.BaseMutationOptions<DeleteFichaMutation, DeleteFichaMutationVariables>;
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
export const GetActivitiesDocument = gql`
    query getActivities {
  getActivities {
    ...ActivityFragment
  }
}
    ${ActivityFragmentFragmentDoc}`;

/**
 * __useGetActivitiesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
      }
export function useGetActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
        }
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<GetActivitiesQuery, GetActivitiesQueryVariables>;
export const CreateActivityDocument = gql`
    mutation createActivity($input: ActivityInput!) {
  createActivity(input: $input) {
    ...ActivityFragment
  }
}
    ${ActivityFragmentFragmentDoc}`;
export type CreateActivityMutationFn = Apollo.MutationFunction<CreateActivityMutation, CreateActivityMutationVariables>;

/**
 * __useCreateActivityMutation__
 *
 * To run a mutation, you first call `useCreateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityMutation, { data, loading, error }] = useCreateActivityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityMutation, CreateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityMutation, CreateActivityMutationVariables>(CreateActivityDocument, options);
      }
export type CreateActivityMutationHookResult = ReturnType<typeof useCreateActivityMutation>;
export type CreateActivityMutationResult = Apollo.MutationResult<CreateActivityMutation>;
export type CreateActivityMutationOptions = Apollo.BaseMutationOptions<CreateActivityMutation, CreateActivityMutationVariables>;
export const GetActivityDocument = gql`
    query getActivity($id: ID!) {
  getActivity(id: $id) {
    ...ActivityFragment
  }
}
    ${ActivityFragmentFragmentDoc}`;

/**
 * __useGetActivityQuery__
 *
 * To run a query within a React component, call `useGetActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetActivityQuery(baseOptions: Apollo.QueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
      }
export function useGetActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
        }
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<GetActivityQuery, GetActivityQueryVariables>;
export const UpdateActivityDocument = gql`
    mutation updateActivity($input: ActivityInput!, $id: ID!) {
  updateActivity(id: $id, input: $input) {
    ...ActivityFragment
  }
}
    ${ActivityFragmentFragmentDoc}`;
export type UpdateActivityMutationFn = Apollo.MutationFunction<UpdateActivityMutation, UpdateActivityMutationVariables>;

/**
 * __useUpdateActivityMutation__
 *
 * To run a mutation, you first call `useUpdateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivityMutation, { data, loading, error }] = useUpdateActivityMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivityMutation, UpdateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActivityMutation, UpdateActivityMutationVariables>(UpdateActivityDocument, options);
      }
export type UpdateActivityMutationHookResult = ReturnType<typeof useUpdateActivityMutation>;
export type UpdateActivityMutationResult = Apollo.MutationResult<UpdateActivityMutation>;
export type UpdateActivityMutationOptions = Apollo.BaseMutationOptions<UpdateActivityMutation, UpdateActivityMutationVariables>;
export const DeleteActivityDocument = gql`
    mutation deleteActivity($id: ID!) {
  deleteActivity(id: $id) {
    ...ActivityFragment
  }
}
    ${ActivityFragmentFragmentDoc}`;
export type DeleteActivityMutationFn = Apollo.MutationFunction<DeleteActivityMutation, DeleteActivityMutationVariables>;

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(DeleteActivityDocument, options);
      }
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>;
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>;
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<DeleteActivityMutation, DeleteActivityMutationVariables>;
export const GetPlansDocument = gql`
    query getPlans {
  getPlans {
    ...PlanFragment
  }
}
    ${PlanFragmentFragmentDoc}`;

/**
 * __useGetPlansQuery__
 *
 * To run a query within a React component, call `useGetPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlansQuery(baseOptions?: Apollo.QueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
      }
export function useGetPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
        }
export type GetPlansQueryHookResult = ReturnType<typeof useGetPlansQuery>;
export type GetPlansLazyQueryHookResult = ReturnType<typeof useGetPlansLazyQuery>;
export type GetPlansQueryResult = Apollo.QueryResult<GetPlansQuery, GetPlansQueryVariables>;
export const GetPlanDocument = gql`
    query getPlan($id: ID!) {
  getPlan(id: $id) {
    ...PlanFragment
  }
}
    ${PlanFragmentFragmentDoc}`;

/**
 * __useGetPlanQuery__
 *
 * To run a query within a React component, call `useGetPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlanQuery(baseOptions: Apollo.QueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
      }
export function useGetPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
        }
export type GetPlanQueryHookResult = ReturnType<typeof useGetPlanQuery>;
export type GetPlanLazyQueryHookResult = ReturnType<typeof useGetPlanLazyQuery>;
export type GetPlanQueryResult = Apollo.QueryResult<GetPlanQuery, GetPlanQueryVariables>;
export const DeletePlanDocument = gql`
    mutation deletePlan($id: ID!) {
  deletePlan(id: $id) {
    ...PlanFragment
  }
}
    ${PlanFragmentFragmentDoc}`;
export type DeletePlanMutationFn = Apollo.MutationFunction<DeletePlanMutation, DeletePlanMutationVariables>;

/**
 * __useDeletePlanMutation__
 *
 * To run a mutation, you first call `useDeletePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlanMutation, { data, loading, error }] = useDeletePlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlanMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlanMutation, DeletePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlanMutation, DeletePlanMutationVariables>(DeletePlanDocument, options);
      }
export type DeletePlanMutationHookResult = ReturnType<typeof useDeletePlanMutation>;
export type DeletePlanMutationResult = Apollo.MutationResult<DeletePlanMutation>;
export type DeletePlanMutationOptions = Apollo.BaseMutationOptions<DeletePlanMutation, DeletePlanMutationVariables>;
export const UpdatePlanDocument = gql`
    mutation updatePlan($input: PlanInput!, $id: ID!) {
  updatePlan(id: $id, input: $input) {
    ...PlanFragment
  }
}
    ${PlanFragmentFragmentDoc}`;
export type UpdatePlanMutationFn = Apollo.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;

/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlanMutation, UpdatePlanMutationVariables>(UpdatePlanDocument, options);
      }
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const CreatePlanDocument = gql`
    mutation createPlan($input: PlanInput!) {
  createPlan(input: $input) {
    ...PlanFragment
  }
}
    ${PlanFragmentFragmentDoc}`;
export type CreatePlanMutationFn = Apollo.MutationFunction<CreatePlanMutation, CreatePlanMutationVariables>;

/**
 * __useCreatePlanMutation__
 *
 * To run a mutation, you first call `useCreatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanMutation, { data, loading, error }] = useCreatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlanMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlanMutation, CreatePlanMutationVariables>(CreatePlanDocument, options);
      }
export type CreatePlanMutationHookResult = ReturnType<typeof useCreatePlanMutation>;
export type CreatePlanMutationResult = Apollo.MutationResult<CreatePlanMutation>;
export type CreatePlanMutationOptions = Apollo.BaseMutationOptions<CreatePlanMutation, CreatePlanMutationVariables>;
type DiscriminateUnion<T, U> = T extends U ? T : never;

export type CreateAsistenceVariables = CreateAsistenceMutationVariables;
export type CreateAsistenceCreateAsistence = (NonNullable<CreateAsistenceMutation['createAsistence']>);
export type UpdateAsistenceVariables = UpdateAsistenceMutationVariables;
export type UpdateAsistenceUpdateAsistence = (NonNullable<UpdateAsistenceMutation['updateAsistence']>);
export type DeleteAsistenceVariables = DeleteAsistenceMutationVariables;
export type DeleteAsistenceDeleteAsistence = (NonNullable<DeleteAsistenceMutation['deleteAsistence']>);
export type FindAsistencesVariables = FindAsistencesQueryVariables;
export type FindAsistencesFinAsistences = NonNullable<(NonNullable<FindAsistencesQuery['finAsistences']>)[number]>;
export type GenerateSignatureVariables = GenerateSignatureMutationVariables;
export type GenerateSignatureSignature = (NonNullable<GenerateSignatureMutation['signature']>);
export type DeleteResourceVariables = DeleteResourceMutationVariables;
export type DeleteResourceDeleteResource = (NonNullable<DeleteResourceMutation['deleteResource']>);
export type DeleteResourceAssetInlineFragment = (DiscriminateUnion<(NonNullable<DeleteResourceMutation['deleteResource']>), { __typename?: 'Asset' }>);
export type DeleteResourceAssetBootInlineFragment = (DiscriminateUnion<(NonNullable<DeleteResourceMutation['deleteResource']>), { __typename?: 'AssetBoot' }>);
export type DeleteResourceAssets = NonNullable<(NonNullable<(DiscriminateUnion<(NonNullable<DeleteResourceMutation['deleteResource']>), { __typename?: 'AssetBoot' }>)['assets']>)[number]>;
export type CreateResourceVariables = CreateResourceMutationVariables;
export type CreateResourceCreateResource = (NonNullable<CreateResourceMutation['createResource']>);
export type CreateResourceAssetInlineFragment = (DiscriminateUnion<(NonNullable<CreateResourceMutation['createResource']>), { __typename?: 'Asset' }>);
export type CreateResourceAssetBootInlineFragment = (DiscriminateUnion<(NonNullable<CreateResourceMutation['createResource']>), { __typename?: 'AssetBoot' }>);
export type CreateResourceAssets = NonNullable<(NonNullable<(DiscriminateUnion<(NonNullable<CreateResourceMutation['createResource']>), { __typename?: 'AssetBoot' }>)['assets']>)[number]>;
export type RegisterClientVariables = RegisterClientMutationVariables;
export type RegisterClientRegisterClient = (NonNullable<RegisterClientMutation['registerClient']>);
export type GetClientsVariables = GetClientsQueryVariables;
export type GetClientsClients = NonNullable<(NonNullable<GetClientsQuery['clients']>)[number]>;
export type GetClientVariables = GetClientQueryVariables;
export type GetClientClient = (NonNullable<GetClientQuery['client']>);
export type OpenAndCloseVariables = OpenAndCloseMutationVariables;
export type OpenAndCloseOpenAndCloseFicha = (NonNullable<OpenAndCloseMutation['openAndCloseFicha']>);
export type GetFichaVariables = GetFichaQueryVariables;
export type GetFichaGetFicha = (NonNullable<GetFichaQuery['getFicha']>);
export type GetFichasVariables = GetFichasQueryVariables;
export type GetFichasGetFichas = NonNullable<(NonNullable<GetFichasQuery['getFichas']>)[number]>;
export type UpdateFichaVariables = UpdateFichaMutationVariables;
export type UpdateFichaUpdateFicha = (NonNullable<UpdateFichaMutation['updateFicha']>);
export type DeleteFichaVariables = DeleteFichaMutationVariables;
export type DeleteFichaDeleteFicha = (NonNullable<DeleteFichaMutation['deleteFicha']>);
export type AssetBootAssets = NonNullable<(NonNullable<AssetBootFragment['assets']>)[number]>;
export type ClientFragmentPhoto = (NonNullable<ClientFragmentFragment['photo']>);
export type FichaFragmentDetails = NonNullable<(NonNullable<FichaFragmentFragment['details']>)[number]>;
export type FichaFragmentAsset = (NonNullable<NonNullable<(NonNullable<FichaFragmentFragment['details']>)[number]>['asset']>);
export type PlanFragmentDetail = (NonNullable<PlanFragmentFragment['detail']>);
export type PlanFragmentSuscription = (NonNullable<PlanFragmentFragment['suscription']>);
export type ActivityFragmentDetail = (NonNullable<ActivityFragmentFragment['detail']>);
export type ActivityFragmentSuscription = (NonNullable<ActivityFragmentFragment['suscription']>);
export type PingQueryVariables = PingQueryQueryVariables;
export type GetActivitiesVariables = GetActivitiesQueryVariables;
export type GetActivitiesGetActivities = NonNullable<(NonNullable<GetActivitiesQuery['getActivities']>)[number]>;
export type CreateActivityVariables = CreateActivityMutationVariables;
export type CreateActivityCreateActivity = (NonNullable<CreateActivityMutation['createActivity']>);
export type GetActivityVariables = GetActivityQueryVariables;
export type GetActivityGetActivity = (NonNullable<GetActivityQuery['getActivity']>);
export type UpdateActivityVariables = UpdateActivityMutationVariables;
export type UpdateActivityUpdateActivity = (NonNullable<UpdateActivityMutation['updateActivity']>);
export type DeleteActivityVariables = DeleteActivityMutationVariables;
export type DeleteActivityDeleteActivity = (NonNullable<DeleteActivityMutation['deleteActivity']>);
export type GetPlansVariables = GetPlansQueryVariables;
export type GetPlansGetPlans = NonNullable<(NonNullable<GetPlansQuery['getPlans']>)[number]>;
export type GetPlanVariables = GetPlanQueryVariables;
export type GetPlanGetPlan = (NonNullable<GetPlanQuery['getPlan']>);
export type DeletePlanVariables = DeletePlanMutationVariables;
export type DeletePlanDeletePlan = (NonNullable<DeletePlanMutation['deletePlan']>);
export type UpdatePlanVariables = UpdatePlanMutationVariables;
export type UpdatePlanUpdatePlan = (NonNullable<UpdatePlanMutation['updatePlan']>);
export type CreatePlanVariables = CreatePlanMutationVariables;
export type CreatePlanCreatePlan = (NonNullable<CreatePlanMutation['createPlan']>);