export enum Role {
  //*  STARTED THE SYSTEM
  SUPERADMIN = 'SUPERADMIN',
  //* full access
  ADMIN = 'ADMIN',
  //* Access the client functionalities
  CLIENT = 'CLIENT',
  //* Have access to some system options
  ADMINSTRATOR = 'ADMINISTRATOR',
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
