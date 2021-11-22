import * as yup from 'yup';
import { Asserts } from 'yup';
import { Sex } from '@wellness/admin-ui/common';

export const saveClientSchema = yup.object({
  name: yup.string().required(),
  imageProfile: yup.mixed().required(),
  email: yup.string().required(),
  birth: yup.date().nullable(),
  phone: yup.string().nullable(),
  direction: yup.string().nullable(),
  note: yup.string().required(),
  dni: yup.string().required(),
  lastName: yup.string().required(),
  sex: yup.mixed().oneOf([Sex.MEN, Sex.OTHER, Sex.WOMEN]),
});

export type SaveClientSchena = Asserts<typeof saveClientSchema>;

export const createAsistenceSchema = yup.object({
  note: yup.string().required('Required'),
});
export type CreateAsistenceT = Asserts<typeof createAsistenceSchema>;
