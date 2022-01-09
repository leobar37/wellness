import { SetState, UseBoundStore, State } from 'zustand';
import { TObject, SafeAny } from '@wellness/common';

export const makeToggle = <T extends TObject>(
  prop: keyof T,
  set: SetState<T>
) => {
  return (val?: boolean) => {
    set(
      (state) => ({ [prop]: val === undefined ? !state[prop] : val } as SafeAny)
    );
  };
};

// export const makeArrApi = <T extends TObject, TState extends State, R>(
//   prop: keyof T,
//   hook: UseBoundStore<TState>,
//   indentifier?: keyof R
// ) => {

//   const use
// };
