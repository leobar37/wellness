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

export type AnyFunction = (...args: SafeAny[])=> SafeAny
/**
 * This partial include a coditional for verify a class
 */
export type DeepPartialSimple<T> = {
  [P in keyof T]?:
    | null
    | (T[P] extends Array<infer U>
        ? Array<DeepPartialSimple<U>>
        : T[P] extends ReadonlyArray<infer X>
        ? ReadonlyArray<DeepPartialSimple<X>>
        : T[P] extends Type<SafeAny>
        ? T[P]
        : DeepPartialSimple<T[P]>);
};

/**
 * @description
 * This enum determine the mode of a suscription
 *
 */
export enum ModeSuscription {
  FIXED = 'FIXED',
  DINAMIC = 'DINAMIC',
}

/**
 * @description define the interval of time
 * this is used in dashboard reports
 */
export enum IntervalTimeEnum {
  LAST_WEEK = 'LAST_WEEK',
  LAST_MONTH = 'LAST_MONTH',
  LAST_YEAR = 'LAST_YEAR',
}

export const DaysMapper = {
  // mapper days in number and name in spanish
  '1': 'Lunes',
  '2': 'Martes',
  '3': 'Miercoles',
  '4': 'Jueves',
  '5': 'Viernes',
  '6': 'Sábado',
  '7': 'Domingo',
};
export const MonthMapper = {
  // mapper days in number and name in spanish
  '1': 'Enero',
  '2': 'Febrero',
  '3': 'Marzo',
  '4': 'Abril',
  '5': 'Mayo',
  '6': 'Junio',
  '7': 'Julio',
  '8': 'Agosto',
  '9': 'Septiembre',
  '10': 'Octubre',
  '11': 'Noviembre',
  '12': 'Diciembre',
};

export interface HasNote {
  note: string;
}
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends TObject
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

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

export type TObject = Record<string, SafeAny>;
