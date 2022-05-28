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
const defaultOptions = {} as const;
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

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  access_token: Scalars['String'];
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

export type Administrator = {
  __typename?: 'Administrator';
  createdAt: Scalars['DateTime'];
  dni: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  rol: Role;
  updateAt: Scalars['DateTime'];
};

export type AlertInput = {
  typeData: TypeDataAlertEnum;
};

export type AlertResult = {
  __typename?: 'AlertResult';
  date: Scalars['DateTime'];
  dateLabel: Scalars['String'];
  label: Scalars['String'];
  sublabel: Scalars['String'];
  typeData: TypeDataAlertEnum;
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

export type AssetEditInput = {
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['JSONObject']>;
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
  phone: Scalars['String'];
  photoId?: InputMaybe<Scalars['Int']>;
  sex: Sex;
};

export type ClientReport = {
  __typename?: 'ClientReport';
  clientId: Scalars['Int'];
  planProgress?: Maybe<PlanProgress>;
};

export type Contract = {
  __typename?: 'Contract';
  createdAt: Scalars['DateTime'];
  finishedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  paid: Scalars['Boolean'];
  price: Scalars['Float'];
  suscription: Suscription;
  updateAt: Scalars['DateTime'];
};

export type ContractEditInput = {
  contractId: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
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

/** This is a view table for show a resume of contract */
export type ContractView = {
  __typename?: 'ContractView';
  clientId: Scalars['ID'];
  clientLastName: Scalars['String'];
  clientName: Scalars['String'];
  contractId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  dni: Scalars['String'];
  finished: Scalars['Boolean'];
  finishedAt: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  note: Scalars['String'];
  paid: Scalars['Boolean'];
  price?: Maybe<Scalars['Float']>;
  realPrice: Scalars['Float'];
  serviceId?: Maybe<Scalars['ID']>;
  suscriptionId: Scalars['ID'];
  type?: Maybe<ServiceType>;
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

export type FiContractsView = {
  clientId?: InputMaybe<Scalars['ID']>;
  serviceId?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<ServiceType>;
};

export type FiltersActivity = {
  active?: InputMaybe<Scalars['Boolean']>;
};

export type FiltersPlan = {
  active?: InputMaybe<Scalars['Boolean']>;
};

export type GrowthInput = {
  interval: IntervaltimeEnum;
  typeData: TypeDataEnum;
};

export type GrowthType = {
  __typename?: 'GrowthType';
  label: Scalars['String'];
  value: Scalars['Float'];
};

export type InputAsistence = {
  clientId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  note?: InputMaybe<Scalars['String']>;
};

/** The time interval for the report */
export enum IntervaltimeEnum {
  LAST_MONTH = 'LAST_MONTH',
  LAST_WEEK = 'LAST_WEEK',
  LAST_YEAR = 'LAST_YEAR'
}

export type LoginAdminInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  deleteAdministrator: Administrator;
  deleteAsistence: Asistence;
  deleteCLient: Client;
  deleteContract: ContractView;
  deleteFicha: Ficha;
  deletePlan: Plan;
  deleteResource: ResourceUnion;
  editAdministrator: Administrator;
  editContract: ContractView;
  editResource: ResourceUnion;
  joinActivity: Contract;
  joinPlan: Contract;
  login: AccessTokenResponse;
  openAndCloseFicha: Ficha;
  registerAdmin: Administrator;
  registerClient: Client;
  resetPassword: Administrator;
  resetPasswordFromAdmin: Administrator;
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


export type MutationDeleteAdministratorArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteAsistenceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCLientArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteContractArgs = {
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


export type MutationEditAdministratorArgs = {
  id: Scalars['ID'];
  input: RegisterAdminInput;
};


export type MutationEditContractArgs = {
  input: ContractEditInput;
};


export type MutationEditResourceArgs = {
  resource: AssetEditInput;
};


export type MutationJoinActivityArgs = {
  contract: ContractInput;
};


export type MutationJoinPlanArgs = {
  contract: ContractInput;
};


export type MutationLoginArgs = {
  input: LoginAdminInput;
};


export type MutationOpenAndCloseFichaArgs = {
  input: FichaInput;
};


export type MutationRegisterAdminArgs = {
  input: RegisterAdminInput;
};


export type MutationRegisterClientArgs = {
  client: ClientInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationResetPasswordFromAdminArgs = {
  input: ResetPasswordInputFromAdmin;
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

export type PlanProgress = {
  __typename?: 'PlanProgress';
  contractLabel: Scalars['String'];
  createdAt: Scalars['DateTime'];
  daysLeft: Scalars['Int'];
  finishedAt: Scalars['DateTime'];
  price: Scalars['Int'];
  progress: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  alertsReport: Array<AlertResult>;
  client: Client;
  clientReport: ClientReport;
  clients: Array<Client>;
  finAsistences: Array<Asistence>;
  getActivities: Array<Activity>;
  getActivity: Activity;
  getAdministrator: Administrator;
  getAdministrators: Array<Administrator>;
  getFicha?: Maybe<Ficha>;
  getFichas?: Maybe<Array<Ficha>>;
  getPlan: Plan;
  getPlans: Array<Plan>;
  getViewContracts: Array<ContractView>;
  growthReport: Array<GrowthType>;
  ping: Scalars['String'];
};


export type QueryAlertsReportArgs = {
  input: AlertInput;
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryClientReportArgs = {
  clientId: Scalars['ID'];
};


export type QueryFinAsistencesArgs = {
  cliendId: Scalars['ID'];
};


export type QueryGetActivitiesArgs = {
  filters?: InputMaybe<FiltersActivity>;
};


export type QueryGetActivityArgs = {
  id: Scalars['ID'];
};


export type QueryGetAdministratorArgs = {
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


export type QueryGetPlansArgs = {
  filters?: InputMaybe<FiltersPlan>;
};


export type QueryGetViewContractsArgs = {
  filters?: InputMaybe<FiContractsView>;
};


export type QueryGrowthReportArgs = {
  input: GrowthInput;
};

export type RegisterAdminInput = {
  dni: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  role: Role;
};

export type ResetPasswordInput = {
  /** Administratror id */
  id: Scalars['ID'];
  newPassword: Scalars['String'];
  /** Prev password of the user */
  prevPassword: Scalars['String'];
};

export type ResetPasswordInputFromAdmin = {
  /** Prev password of the user */
  adminPassword: Scalars['String'];
  newPassword: Scalars['String'];
  /** User id */
  userId: Scalars['ID'];
};

export type ResourceUnion = Asset | AssetBoot;

export type ResponseSignature = {
  __typename?: 'ResponseSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Float'];
};

/** Describe the role of a administrator */
export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  STAFF = 'STAFF'
}

/** Type of the service (plan, activity) */
export enum ServiceType {
  activity = 'activity',
  plan = 'plan'
}

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

/** The type of data for the Alert report */
export enum TypeDataAlertEnum {
  birthday = 'birthday',
  plans_to_overcome = 'plans_to_overcome'
}

/** The type of data for the report */
export enum TypeDataEnum {
  asistences = 'asistences',
  plans = 'plans',
  register_clients = 'register_clients'
}

export type RegisterAdminMutationVariables = Exact<{
  input: RegisterAdminInput;
}>;


export type RegisterAdminMutation = { __typename?: 'Mutation', registerAdmin: { __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string } };

export type EditAdministratorMutationVariables = Exact<{
  input: RegisterAdminInput;
  id: Scalars['ID'];
}>;


export type EditAdministratorMutation = { __typename?: 'Mutation', editAdministrator: { __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string } };

export type ResetPasswordFromAdminMutationVariables = Exact<{
  input: ResetPasswordInputFromAdmin;
}>;


export type ResetPasswordFromAdminMutation = { __typename?: 'Mutation', resetPasswordFromAdmin: { __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string } };

export type GetAdministratorQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAdministratorQuery = { __typename?: 'Query', getAdministrator: { __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string } };

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
  publicId?: InputMaybe<Scalars['String']>;
}>;


export type GenerateSignatureMutation = { __typename?: 'Mutation', signature: { __typename?: 'ResponseSignature', signature: string, timestamp: number } };

export type DeleteResourceMutationVariables = Exact<{
  input: DeleteAssetInput;
}>;


export type DeleteResourceMutation = { __typename?: 'Mutation', deleteResource: { __typename: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } | { __typename: 'AssetBoot', id: string, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } };

export type CreateResourceMutationVariables = Exact<{
  resource: AssetInput;
}>;


export type CreateResourceMutation = { __typename?: 'Mutation', createResource: { __typename: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } | { __typename: 'AssetBoot', id: string, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } };

export type EditResourceMutationVariables = Exact<{
  resource: AssetEditInput;
}>;


export type EditResourceMutation = { __typename?: 'Mutation', editResource: { __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } | { __typename?: 'AssetBoot' } };

export type LoginMutationVariables = Exact<{
  input: LoginAdminInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessTokenResponse', access_token: string } };

export type RegisterClientMutationVariables = Exact<{
  client: ClientInput;
}>;


export type RegisterClientMutation = { __typename?: 'Mutation', registerClient: { __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny, phone?: string, direction?: string, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } } };

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny, phone?: string, direction?: string, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } }> };

export type GetClientQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetClientQuery = { __typename?: 'Query', client: { __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny, phone?: string, direction?: string, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } } };

export type UpdateClientMutationVariables = Exact<{
  input: ClientInput;
  id: Scalars['ID'];
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateCLient: { __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny, phone?: string, direction?: string, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } } };

export type ClientReportQueryVariables = Exact<{
  clientId: Scalars['ID'];
}>;


export type ClientReportQuery = { __typename?: 'Query', clientReport: { __typename?: 'ClientReport', planProgress?: { __typename?: 'PlanProgress', progress: number, contractLabel: string, price: number, finishedAt: SafeAny, createdAt: SafeAny, daysLeft: number } } };

export type OpenAndCloseMutationVariables = Exact<{
  input: FichaInput;
}>;


export type OpenAndCloseMutation = { __typename?: 'Mutation', openAndCloseFicha: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string, note?: string, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } }> } };

export type GetFichaQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetFichaQuery = { __typename?: 'Query', getFicha?: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string, note?: string, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } }> } };

export type GetFichasQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetFichasQuery = { __typename?: 'Query', getFichas?: Array<{ __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string, note?: string, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } }> }> };

export type UpdateFichaMutationVariables = Exact<{
  input: FichaInput;
  detailId: Scalars['Int'];
}>;


export type UpdateFichaMutation = { __typename?: 'Mutation', updateFicha: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string, note?: string, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } }> } };

export type DeleteFichaMutationVariables = Exact<{
  fichaId: Scalars['Int'];
}>;


export type DeleteFichaMutation = { __typename?: 'Mutation', deleteFicha: { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string, note?: string, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } }> } };

export type AdministratorFragmentFragment = { __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string };

export type GetAdministratorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdministratorsQuery = { __typename?: 'Query', getAdministrators: Array<{ __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string }> };

export type DeleteAdministratorMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAdministratorMutation = { __typename?: 'Mutation', deleteAdministrator: { __typename?: 'Administrator', id: string, createdAt: SafeAny, updateAt: SafeAny, name: string, lastName: string, email: string, rol: Role, dni: string, password?: string } };

export type AsistenceFragmentFragment = { __typename?: 'Asistence', id: string, createdAt: SafeAny, updateAt: SafeAny, note: string };

export type AssetFragmentFragment = { __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny };

export type AssetBootFragment = { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> };

export type ClientFragmentFragment = { __typename?: 'Client', id: string, code: string, dni: string, createdAt: SafeAny, email: string, name: string, lastName: string, birth?: SafeAny, phone?: string, direction?: string, sex: Sex, mode: ModeRegiser, photo?: { __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny } };

export type FichaFragmentFragment = { __typename?: 'Ficha', id: string, createdAt: SafeAny, closedAt?: SafeAny, closed: boolean, updateAt: SafeAny, details: Array<{ __typename?: 'DetailFicha', id: string, open: boolean, createdAt: SafeAny, updateAt: SafeAny, weight: number, objective?: string, note?: string, asset?: { __typename?: 'AssetBoot', id: string, createdAt: SafeAny, updateAt: SafeAny, assets: Array<{ __typename?: 'Asset', name: string, size?: number, previewUrl?: string, id: string, createdAt: SafeAny, updateAt: SafeAny }> } }> };

export type ContractViewFragmentFragment = { __typename?: 'ContractView', name?: string, serviceId?: string, price?: number, type?: ServiceType, clientId: string, suscriptionId: string, finished: boolean, note: string, createdAt: SafeAny, finishedAt: SafeAny, contractId: string, clientName: string, description?: string, realPrice: number, clientLastName: string, paid: boolean };

export type DetailFragmentFragment = { __typename?: 'Detail', name: string, description: string, price: number };

export type PlanFragmentFragment = { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } };

export type SubscriptionFragmentFragment = { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny };

export type ActivityFragmentFragment = { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } };

export type ContractFragmentFragment = { __typename?: 'Contract', id: string, createdAt: SafeAny, updateAt: SafeAny, note?: string, paid: boolean, price: number, finishedAt: SafeAny, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } };

export type PingQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQueryQuery = { __typename?: 'Query', ping: string };

export type GrowthReportQueryVariables = Exact<{
  input: GrowthInput;
}>;


export type GrowthReportQuery = { __typename?: 'Query', growthReport: Array<{ __typename?: 'GrowthType', label: string, value: number }> };

export type AlertsReportQueryVariables = Exact<{
  input: AlertInput;
}>;


export type AlertsReportQuery = { __typename?: 'Query', alertsReport: Array<{ __typename?: 'AlertResult', typeData: TypeDataAlertEnum, label: string, sublabel: string, date: SafeAny, dateLabel: string }> };

export type GetActivitiesQueryVariables = Exact<{
  filters?: InputMaybe<FiltersActivity>;
}>;


export type GetActivitiesQuery = { __typename?: 'Query', getActivities: Array<{ __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } }> };

export type CreateActivityMutationVariables = Exact<{
  input: ActivityInput;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type GetActivityQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetActivityQuery = { __typename?: 'Query', getActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type UpdateActivityMutationVariables = Exact<{
  input: ActivityInput;
  id: Scalars['ID'];
}>;


export type UpdateActivityMutation = { __typename?: 'Mutation', updateActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type DeleteActivityMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity: { __typename?: 'Activity', id: string, createdAt: SafeAny, updateAt: SafeAny, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type GetPlansQueryVariables = Exact<{
  filters?: InputMaybe<FiltersPlan>;
}>;


export type GetPlansQuery = { __typename?: 'Query', getPlans: Array<{ __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } }> };

export type GetPlanQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlanQuery = { __typename?: 'Query', getPlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type DeletePlanMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type UpdatePlanMutationVariables = Exact<{
  input: PlanInput;
  id: Scalars['ID'];
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type CreatePlanMutationVariables = Exact<{
  input: PlanInput;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: { __typename?: 'Plan', id: string, createdAt: SafeAny, updateAt: SafeAny, visible: boolean, detail: { __typename?: 'Detail', name: string, description: string, price: number }, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type JoinPlanMutationVariables = Exact<{
  contract: ContractInput;
}>;


export type JoinPlanMutation = { __typename?: 'Mutation', joinPlan: { __typename?: 'Contract', id: string, createdAt: SafeAny, updateAt: SafeAny, note?: string, paid: boolean, price: number, finishedAt: SafeAny, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type JoinActivityMutationVariables = Exact<{
  contract: ContractInput;
}>;


export type JoinActivityMutation = { __typename?: 'Mutation', joinActivity: { __typename?: 'Contract', id: string, createdAt: SafeAny, updateAt: SafeAny, note?: string, paid: boolean, price: number, finishedAt: SafeAny, suscription: { __typename?: 'Suscription', id: string, createdAt: SafeAny, updateAt: SafeAny, duration: number, active: boolean, mode: ModeSuscription, startAt?: SafeAny, finishedAt?: SafeAny } } };

export type GetViewContractsQueryVariables = Exact<{
  filters?: InputMaybe<FiContractsView>;
}>;


export type GetViewContractsQuery = { __typename?: 'Query', getViewContracts: Array<{ __typename?: 'ContractView', name?: string, serviceId?: string, price?: number, type?: ServiceType, clientId: string, suscriptionId: string, finished: boolean, note: string, createdAt: SafeAny, finishedAt: SafeAny, contractId: string, clientName: string, description?: string, realPrice: number, clientLastName: string, paid: boolean }> };

export type EditContractMutationVariables = Exact<{
  input: ContractEditInput;
}>;


export type EditContractMutation = { __typename?: 'Mutation', editContract: { __typename?: 'ContractView', name?: string, serviceId?: string, price?: number, type?: ServiceType, clientId: string, suscriptionId: string, finished: boolean, note: string, createdAt: SafeAny, finishedAt: SafeAny, contractId: string, clientName: string, description?: string, realPrice: number, clientLastName: string, paid: boolean } };

export type DeleteContractMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteContractMutation = { __typename?: 'Mutation', deleteContract: { __typename?: 'ContractView', name?: string, serviceId?: string, price?: number, type?: ServiceType, clientId: string, suscriptionId: string, finished: boolean, note: string, createdAt: SafeAny, finishedAt: SafeAny, contractId: string, clientName: string, description?: string, realPrice: number, clientLastName: string, paid: boolean } };

export const AdministratorFragmentFragmentDoc = gql`
    fragment administratorFragment on Administrator {
  id
  createdAt
  updateAt
  name
  lastName
  email
  rol
  dni
  password
}
    `;
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
export const ContractViewFragmentFragmentDoc = gql`
    fragment ContractViewFragment on ContractView {
  name
  serviceId
  price
  type
  clientId
  suscriptionId
  finished
  note
  createdAt
  finishedAt
  contractId
  clientName
  description
  realPrice
  clientLastName
  paid
}
    `;
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
export const ContractFragmentFragmentDoc = gql`
    fragment ContractFragment on Contract {
  id
  createdAt
  updateAt
  note
  paid
  price
  finishedAt
  suscription {
    ...SubscriptionFragment
  }
}
    ${SubscriptionFragmentFragmentDoc}`;
export const RegisterAdminDocument = gql`
    mutation registerAdmin($input: RegisterAdminInput!) {
  registerAdmin(input: $input) {
    ...administratorFragment
  }
}
    ${AdministratorFragmentFragmentDoc}`;
export type RegisterAdminMutationFn = Apollo.MutationFunction<RegisterAdminMutation, RegisterAdminMutationVariables>;

/**
 * __useRegisterAdminMutation__
 *
 * To run a mutation, you first call `useRegisterAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAdminMutation, { data, loading, error }] = useRegisterAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterAdminMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAdminMutation, RegisterAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAdminMutation, RegisterAdminMutationVariables>(RegisterAdminDocument, options);
      }
export type RegisterAdminMutationHookResult = ReturnType<typeof useRegisterAdminMutation>;
export type RegisterAdminMutationResult = Apollo.MutationResult<RegisterAdminMutation>;
export type RegisterAdminMutationOptions = Apollo.BaseMutationOptions<RegisterAdminMutation, RegisterAdminMutationVariables>;
export const EditAdministratorDocument = gql`
    mutation editAdministrator($input: RegisterAdminInput!, $id: ID!) {
  editAdministrator(input: $input, id: $id) {
    ...administratorFragment
  }
}
    ${AdministratorFragmentFragmentDoc}`;
export type EditAdministratorMutationFn = Apollo.MutationFunction<EditAdministratorMutation, EditAdministratorMutationVariables>;

/**
 * __useEditAdministratorMutation__
 *
 * To run a mutation, you first call `useEditAdministratorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAdministratorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAdministratorMutation, { data, loading, error }] = useEditAdministratorMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditAdministratorMutation(baseOptions?: Apollo.MutationHookOptions<EditAdministratorMutation, EditAdministratorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAdministratorMutation, EditAdministratorMutationVariables>(EditAdministratorDocument, options);
      }
export type EditAdministratorMutationHookResult = ReturnType<typeof useEditAdministratorMutation>;
export type EditAdministratorMutationResult = Apollo.MutationResult<EditAdministratorMutation>;
export type EditAdministratorMutationOptions = Apollo.BaseMutationOptions<EditAdministratorMutation, EditAdministratorMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    ...administratorFragment
  }
}
    ${AdministratorFragmentFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResetPasswordFromAdminDocument = gql`
    mutation resetPasswordFromAdmin($input: ResetPasswordInputFromAdmin!) {
  resetPasswordFromAdmin(input: $input) {
    ...administratorFragment
  }
}
    ${AdministratorFragmentFragmentDoc}`;
export type ResetPasswordFromAdminMutationFn = Apollo.MutationFunction<ResetPasswordFromAdminMutation, ResetPasswordFromAdminMutationVariables>;

/**
 * __useResetPasswordFromAdminMutation__
 *
 * To run a mutation, you first call `useResetPasswordFromAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordFromAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordFromAdminMutation, { data, loading, error }] = useResetPasswordFromAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordFromAdminMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordFromAdminMutation, ResetPasswordFromAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordFromAdminMutation, ResetPasswordFromAdminMutationVariables>(ResetPasswordFromAdminDocument, options);
      }
export type ResetPasswordFromAdminMutationHookResult = ReturnType<typeof useResetPasswordFromAdminMutation>;
export type ResetPasswordFromAdminMutationResult = Apollo.MutationResult<ResetPasswordFromAdminMutation>;
export type ResetPasswordFromAdminMutationOptions = Apollo.BaseMutationOptions<ResetPasswordFromAdminMutation, ResetPasswordFromAdminMutationVariables>;
export const GetAdministratorDocument = gql`
    query getAdministrator($id: ID!) {
  getAdministrator(id: $id) {
    ...administratorFragment
  }
}
    ${AdministratorFragmentFragmentDoc}`;

/**
 * __useGetAdministratorQuery__
 *
 * To run a query within a React component, call `useGetAdministratorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdministratorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdministratorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAdministratorQuery(baseOptions: Apollo.QueryHookOptions<GetAdministratorQuery, GetAdministratorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdministratorQuery, GetAdministratorQueryVariables>(GetAdministratorDocument, options);
      }
export function useGetAdministratorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdministratorQuery, GetAdministratorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdministratorQuery, GetAdministratorQueryVariables>(GetAdministratorDocument, options);
        }
export type GetAdministratorQueryHookResult = ReturnType<typeof useGetAdministratorQuery>;
export type GetAdministratorLazyQueryHookResult = ReturnType<typeof useGetAdministratorLazyQuery>;
export type GetAdministratorQueryResult = Apollo.QueryResult<GetAdministratorQuery, GetAdministratorQueryVariables>;
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
export const EditResourceDocument = gql`
    mutation editResource($resource: AssetEditInput!) {
  editResource(resource: $resource) {
    ...AssetFragment
  }
}
    ${AssetFragmentFragmentDoc}`;
export type EditResourceMutationFn = Apollo.MutationFunction<EditResourceMutation, EditResourceMutationVariables>;

/**
 * __useEditResourceMutation__
 *
 * To run a mutation, you first call `useEditResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editResourceMutation, { data, loading, error }] = useEditResourceMutation({
 *   variables: {
 *      resource: // value for 'resource'
 *   },
 * });
 */
export function useEditResourceMutation(baseOptions?: Apollo.MutationHookOptions<EditResourceMutation, EditResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditResourceMutation, EditResourceMutationVariables>(EditResourceDocument, options);
      }
export type EditResourceMutationHookResult = ReturnType<typeof useEditResourceMutation>;
export type EditResourceMutationResult = Apollo.MutationResult<EditResourceMutation>;
export type EditResourceMutationOptions = Apollo.BaseMutationOptions<EditResourceMutation, EditResourceMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginAdminInput!) {
  login(input: $input) {
    access_token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export const UpdateClientDocument = gql`
    mutation updateClient($input: ClientInput!, $id: ID!) {
  updateCLient(id: $id, input: $input) {
    ...ClientFragment
  }
}
    ${ClientFragmentFragmentDoc}`;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const ClientReportDocument = gql`
    query clientReport($clientId: ID!) {
  clientReport(clientId: $clientId) {
    planProgress {
      progress
      contractLabel
      price
      finishedAt
      createdAt
      daysLeft
    }
  }
}
    `;

/**
 * __useClientReportQuery__
 *
 * To run a query within a React component, call `useClientReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientReportQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientReportQuery(baseOptions: Apollo.QueryHookOptions<ClientReportQuery, ClientReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientReportQuery, ClientReportQueryVariables>(ClientReportDocument, options);
      }
export function useClientReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientReportQuery, ClientReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientReportQuery, ClientReportQueryVariables>(ClientReportDocument, options);
        }
export type ClientReportQueryHookResult = ReturnType<typeof useClientReportQuery>;
export type ClientReportLazyQueryHookResult = ReturnType<typeof useClientReportLazyQuery>;
export type ClientReportQueryResult = Apollo.QueryResult<ClientReportQuery, ClientReportQueryVariables>;
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
export const GetAdministratorsDocument = gql`
    query getAdministrators {
  getAdministrators {
    ...administratorFragment
  }
}
    ${AdministratorFragmentFragmentDoc}`;

/**
 * __useGetAdministratorsQuery__
 *
 * To run a query within a React component, call `useGetAdministratorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdministratorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdministratorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdministratorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdministratorsQuery, GetAdministratorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdministratorsQuery, GetAdministratorsQueryVariables>(GetAdministratorsDocument, options);
      }
export function useGetAdministratorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdministratorsQuery, GetAdministratorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdministratorsQuery, GetAdministratorsQueryVariables>(GetAdministratorsDocument, options);
        }
export type GetAdministratorsQueryHookResult = ReturnType<typeof useGetAdministratorsQuery>;
export type GetAdministratorsLazyQueryHookResult = ReturnType<typeof useGetAdministratorsLazyQuery>;
export type GetAdministratorsQueryResult = Apollo.QueryResult<GetAdministratorsQuery, GetAdministratorsQueryVariables>;
export const DeleteAdministratorDocument = gql`
    mutation deleteAdministrator($id: ID!) {
  deleteAdministrator(id: $id) {
    ...administratorFragment
  }
}
    ${AdministratorFragmentFragmentDoc}`;
export type DeleteAdministratorMutationFn = Apollo.MutationFunction<DeleteAdministratorMutation, DeleteAdministratorMutationVariables>;

/**
 * __useDeleteAdministratorMutation__
 *
 * To run a mutation, you first call `useDeleteAdministratorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdministratorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdministratorMutation, { data, loading, error }] = useDeleteAdministratorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAdministratorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdministratorMutation, DeleteAdministratorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdministratorMutation, DeleteAdministratorMutationVariables>(DeleteAdministratorDocument, options);
      }
export type DeleteAdministratorMutationHookResult = ReturnType<typeof useDeleteAdministratorMutation>;
export type DeleteAdministratorMutationResult = Apollo.MutationResult<DeleteAdministratorMutation>;
export type DeleteAdministratorMutationOptions = Apollo.BaseMutationOptions<DeleteAdministratorMutation, DeleteAdministratorMutationVariables>;
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
export const GrowthReportDocument = gql`
    query growthReport($input: GrowthInput!) {
  growthReport(input: $input) {
    label
    value
  }
}
    `;

/**
 * __useGrowthReportQuery__
 *
 * To run a query within a React component, call `useGrowthReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrowthReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrowthReportQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGrowthReportQuery(baseOptions: Apollo.QueryHookOptions<GrowthReportQuery, GrowthReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GrowthReportQuery, GrowthReportQueryVariables>(GrowthReportDocument, options);
      }
export function useGrowthReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrowthReportQuery, GrowthReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GrowthReportQuery, GrowthReportQueryVariables>(GrowthReportDocument, options);
        }
export type GrowthReportQueryHookResult = ReturnType<typeof useGrowthReportQuery>;
export type GrowthReportLazyQueryHookResult = ReturnType<typeof useGrowthReportLazyQuery>;
export type GrowthReportQueryResult = Apollo.QueryResult<GrowthReportQuery, GrowthReportQueryVariables>;
export const AlertsReportDocument = gql`
    query AlertsReport($input: AlertInput!) {
  alertsReport(input: $input) {
    typeData
    label
    sublabel
    date
    dateLabel
  }
}
    `;

/**
 * __useAlertsReportQuery__
 *
 * To run a query within a React component, call `useAlertsReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlertsReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlertsReportQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAlertsReportQuery(baseOptions: Apollo.QueryHookOptions<AlertsReportQuery, AlertsReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AlertsReportQuery, AlertsReportQueryVariables>(AlertsReportDocument, options);
      }
export function useAlertsReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlertsReportQuery, AlertsReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AlertsReportQuery, AlertsReportQueryVariables>(AlertsReportDocument, options);
        }
export type AlertsReportQueryHookResult = ReturnType<typeof useAlertsReportQuery>;
export type AlertsReportLazyQueryHookResult = ReturnType<typeof useAlertsReportLazyQuery>;
export type AlertsReportQueryResult = Apollo.QueryResult<AlertsReportQuery, AlertsReportQueryVariables>;
export const GetActivitiesDocument = gql`
    query getActivities($filters: FiltersActivity) {
  getActivities(filters: $filters) {
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
 *      filters: // value for 'filters'
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
    query getPlans($filters: FiltersPlan) {
  getPlans(filters: $filters) {
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
 *      filters: // value for 'filters'
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
export const JoinPlanDocument = gql`
    mutation joinPlan($contract: ContractInput!) {
  joinPlan(contract: $contract) {
    ...ContractFragment
  }
}
    ${ContractFragmentFragmentDoc}`;
export type JoinPlanMutationFn = Apollo.MutationFunction<JoinPlanMutation, JoinPlanMutationVariables>;

/**
 * __useJoinPlanMutation__
 *
 * To run a mutation, you first call `useJoinPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinPlanMutation, { data, loading, error }] = useJoinPlanMutation({
 *   variables: {
 *      contract: // value for 'contract'
 *   },
 * });
 */
export function useJoinPlanMutation(baseOptions?: Apollo.MutationHookOptions<JoinPlanMutation, JoinPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinPlanMutation, JoinPlanMutationVariables>(JoinPlanDocument, options);
      }
export type JoinPlanMutationHookResult = ReturnType<typeof useJoinPlanMutation>;
export type JoinPlanMutationResult = Apollo.MutationResult<JoinPlanMutation>;
export type JoinPlanMutationOptions = Apollo.BaseMutationOptions<JoinPlanMutation, JoinPlanMutationVariables>;
export const JoinActivityDocument = gql`
    mutation JoinActivity($contract: ContractInput!) {
  joinActivity(contract: $contract) {
    ...ContractFragment
  }
}
    ${ContractFragmentFragmentDoc}`;
export type JoinActivityMutationFn = Apollo.MutationFunction<JoinActivityMutation, JoinActivityMutationVariables>;

/**
 * __useJoinActivityMutation__
 *
 * To run a mutation, you first call `useJoinActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinActivityMutation, { data, loading, error }] = useJoinActivityMutation({
 *   variables: {
 *      contract: // value for 'contract'
 *   },
 * });
 */
export function useJoinActivityMutation(baseOptions?: Apollo.MutationHookOptions<JoinActivityMutation, JoinActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinActivityMutation, JoinActivityMutationVariables>(JoinActivityDocument, options);
      }
export type JoinActivityMutationHookResult = ReturnType<typeof useJoinActivityMutation>;
export type JoinActivityMutationResult = Apollo.MutationResult<JoinActivityMutation>;
export type JoinActivityMutationOptions = Apollo.BaseMutationOptions<JoinActivityMutation, JoinActivityMutationVariables>;
export const GetViewContractsDocument = gql`
    query getViewContracts($filters: FiContractsView) {
  getViewContracts(filters: $filters) {
    ...ContractViewFragment
  }
}
    ${ContractViewFragmentFragmentDoc}`;

/**
 * __useGetViewContractsQuery__
 *
 * To run a query within a React component, call `useGetViewContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewContractsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetViewContractsQuery(baseOptions?: Apollo.QueryHookOptions<GetViewContractsQuery, GetViewContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetViewContractsQuery, GetViewContractsQueryVariables>(GetViewContractsDocument, options);
      }
export function useGetViewContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetViewContractsQuery, GetViewContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetViewContractsQuery, GetViewContractsQueryVariables>(GetViewContractsDocument, options);
        }
export type GetViewContractsQueryHookResult = ReturnType<typeof useGetViewContractsQuery>;
export type GetViewContractsLazyQueryHookResult = ReturnType<typeof useGetViewContractsLazyQuery>;
export type GetViewContractsQueryResult = Apollo.QueryResult<GetViewContractsQuery, GetViewContractsQueryVariables>;
export const EditContractDocument = gql`
    mutation editContract($input: ContractEditInput!) {
  editContract(input: $input) {
    ...ContractViewFragment
  }
}
    ${ContractViewFragmentFragmentDoc}`;
export type EditContractMutationFn = Apollo.MutationFunction<EditContractMutation, EditContractMutationVariables>;

/**
 * __useEditContractMutation__
 *
 * To run a mutation, you first call `useEditContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editContractMutation, { data, loading, error }] = useEditContractMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditContractMutation(baseOptions?: Apollo.MutationHookOptions<EditContractMutation, EditContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditContractMutation, EditContractMutationVariables>(EditContractDocument, options);
      }
export type EditContractMutationHookResult = ReturnType<typeof useEditContractMutation>;
export type EditContractMutationResult = Apollo.MutationResult<EditContractMutation>;
export type EditContractMutationOptions = Apollo.BaseMutationOptions<EditContractMutation, EditContractMutationVariables>;
export const DeleteContractDocument = gql`
    mutation deleteContract($id: ID!) {
  deleteContract(id: $id) {
    ...ContractViewFragment
  }
}
    ${ContractViewFragmentFragmentDoc}`;
export type DeleteContractMutationFn = Apollo.MutationFunction<DeleteContractMutation, DeleteContractMutationVariables>;

/**
 * __useDeleteContractMutation__
 *
 * To run a mutation, you first call `useDeleteContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContractMutation, { data, loading, error }] = useDeleteContractMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContractMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContractMutation, DeleteContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContractMutation, DeleteContractMutationVariables>(DeleteContractDocument, options);
      }
export type DeleteContractMutationHookResult = ReturnType<typeof useDeleteContractMutation>;
export type DeleteContractMutationResult = Apollo.MutationResult<DeleteContractMutation>;
export type DeleteContractMutationOptions = Apollo.BaseMutationOptions<DeleteContractMutation, DeleteContractMutationVariables>;
type DiscriminateUnion<T, U> = T extends U ? T : never;

export type RegisterAdminVariables = RegisterAdminMutationVariables;
export type RegisterAdminRegisterAdmin = (NonNullable<RegisterAdminMutation['registerAdmin']>);
export type EditAdministratorVariables = EditAdministratorMutationVariables;
export type EditAdministratorEditAdministrator = (NonNullable<EditAdministratorMutation['editAdministrator']>);
export type ResetPasswordVariables = ResetPasswordMutationVariables;
export type ResetPasswordResetPassword = (NonNullable<ResetPasswordMutation['resetPassword']>);
export type ResetPasswordFromAdminVariables = ResetPasswordFromAdminMutationVariables;
export type ResetPasswordFromAdminResetPasswordFromAdmin = (NonNullable<ResetPasswordFromAdminMutation['resetPasswordFromAdmin']>);
export type GetAdministratorVariables = GetAdministratorQueryVariables;
export type GetAdministratorGetAdministrator = (NonNullable<GetAdministratorQuery['getAdministrator']>);
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
export type EditResourceVariables = EditResourceMutationVariables;
export type EditResourceEditResource = (NonNullable<EditResourceMutation['editResource']>);
export type LoginVariables = LoginMutationVariables;
export type LoginLogin = (NonNullable<LoginMutation['login']>);
export type RegisterClientVariables = RegisterClientMutationVariables;
export type RegisterClientRegisterClient = (NonNullable<RegisterClientMutation['registerClient']>);
export type GetClientsVariables = GetClientsQueryVariables;
export type GetClientsClients = NonNullable<(NonNullable<GetClientsQuery['clients']>)[number]>;
export type GetClientVariables = GetClientQueryVariables;
export type GetClientClient = (NonNullable<GetClientQuery['client']>);
export type UpdateClientVariables = UpdateClientMutationVariables;
export type UpdateClientUpdateCLient = (NonNullable<UpdateClientMutation['updateCLient']>);
export type ClientReportVariables = ClientReportQueryVariables;
export type ClientReportClientReport = (NonNullable<ClientReportQuery['clientReport']>);
export type ClientReportPlanProgress = (NonNullable<(NonNullable<ClientReportQuery['clientReport']>)['planProgress']>);
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
export type GetAdministratorsVariables = GetAdministratorsQueryVariables;
export type GetAdministratorsGetAdministrators = NonNullable<(NonNullable<GetAdministratorsQuery['getAdministrators']>)[number]>;
export type DeleteAdministratorVariables = DeleteAdministratorMutationVariables;
export type DeleteAdministratorDeleteAdministrator = (NonNullable<DeleteAdministratorMutation['deleteAdministrator']>);
export type AssetBootAssets = NonNullable<(NonNullable<AssetBootFragment['assets']>)[number]>;
export type ClientFragmentPhoto = (NonNullable<ClientFragmentFragment['photo']>);
export type FichaFragmentDetails = NonNullable<(NonNullable<FichaFragmentFragment['details']>)[number]>;
export type FichaFragmentAsset = (NonNullable<NonNullable<(NonNullable<FichaFragmentFragment['details']>)[number]>['asset']>);
export type PlanFragmentDetail = (NonNullable<PlanFragmentFragment['detail']>);
export type PlanFragmentSuscription = (NonNullable<PlanFragmentFragment['suscription']>);
export type ActivityFragmentDetail = (NonNullable<ActivityFragmentFragment['detail']>);
export type ActivityFragmentSuscription = (NonNullable<ActivityFragmentFragment['suscription']>);
export type ContractFragmentSuscription = (NonNullable<ContractFragmentFragment['suscription']>);
export type PingQueryVariables = PingQueryQueryVariables;
export type GrowthReportVariables = GrowthReportQueryVariables;
export type GrowthReportGrowthReport = NonNullable<(NonNullable<GrowthReportQuery['growthReport']>)[number]>;
export type AlertsReportVariables = AlertsReportQueryVariables;
export type AlertsReportAlertsReport = NonNullable<(NonNullable<AlertsReportQuery['alertsReport']>)[number]>;
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
export type JoinPlanVariables = JoinPlanMutationVariables;
export type JoinPlanJoinPlan = (NonNullable<JoinPlanMutation['joinPlan']>);
export type JoinActivityVariables = JoinActivityMutationVariables;
export type JoinActivityJoinActivity = (NonNullable<JoinActivityMutation['joinActivity']>);
export type GetViewContractsVariables = GetViewContractsQueryVariables;
export type GetViewContractsGetViewContracts = NonNullable<(NonNullable<GetViewContractsQuery['getViewContracts']>)[number]>;
export type EditContractVariables = EditContractMutationVariables;
export type EditContractEditContract = (NonNullable<EditContractMutation['editContract']>);
export type DeleteContractVariables = DeleteContractMutationVariables;
export type DeleteContractDeleteContract = (NonNullable<DeleteContractMutation['deleteContract']>);