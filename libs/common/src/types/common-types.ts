import { SafeAny } from '../shared-types';
export enum Role {
  //* full access
  ADMIN = 'ADMIN',
  //* Access the client functionalities
  CLIENT = 'CLIENT',
  //* Have access to some system options
  STAFF = 'STAFF',
}

export enum ServiceType {
  plan = 'plan',
  activity = 'activity',
}

export enum Sex {
  WOMEN = 'WOMEN',
  MEN = 'MEN',
  OTHER = 'OTHER',
}

/**
 * @description
 * This enum determine the mode of registration of a client
 *
 *
 */

export enum ModeRegiser {
  SELF = 'SELF',
  ADMIN = 'ADMIN',
}

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: SafeAny[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
}
