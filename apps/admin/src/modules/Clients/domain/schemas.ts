import * as yup from 'yup';
import { Asserts } from 'yup';
import { Sex } from '@wellness/admin-ui/common';

export const saveClientSchema = yup.object({
  name: yup.string().min(1).required(),
  imageProfile: yup.mixed().optional(),
  email: yup.string().email().required(),
  birth: yup.date().required(),
  phone: yup.string().nullable(),
  direction: yup.string().nullable(),
  dni: yup.string().nullable(),
  lastName: yup.string().min(1).required(),
  sex: yup.mixed().required().oneOf([Sex.MEN, Sex.OTHER, Sex.WOMEN]),
});

export type SaveClientSchena = Asserts<typeof saveClientSchema>;

export const createAsistenceSchema = yup.object({
  createdAt: yup
    .date()
    .required()
    .default(() => new Date()),
  note: yup.string().nullable(),
});
export type CreateAsistenceT = Asserts<typeof createAsistenceSchema>;

export const detailFichaSchema = yup.object({
  files: yup.array().of(yup.mixed()).required().min(1).max(5),
  weight: yup.number().required(),
  note: yup.string().nullable(),
});

export type DetailFichaT = Asserts<typeof detailFichaSchema>;

export const createContractSchema = yup.object({
  paid: yup.boolean().default(true).required(),
  price: yup.number().required(),
  note: yup.string().nullable(),
  serviceId: yup.number().required(),
  typeService: yup.number().required(),
});

export type CreateContract = Asserts<typeof createContractSchema>;
