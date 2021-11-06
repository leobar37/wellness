export type ID = string | number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;

/**
 * A recursive implementation of the Partial<T> type.
 * Source: https://stackoverflow.com/a/49936686/772859
 */
export type DeepPartial<T> = {
  [P in keyof T]?:
    | null
    | (T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>);
};

/**
 * A type representing the type rather than instance of a class.
 */
export interface Type<T> extends Function {
  // tslint:disable-next-line:callable-types
  new (...args: SafeAny[]): T;
}

// CRUD OPERATION

export enum CRUD {
  UPDATE = 'UPDATE',
  DELETE = 'DELET',
  READ = 'READ',
  CREATE = 'CREATE',
}

export type SafeAny = Record<string, unknown>;
