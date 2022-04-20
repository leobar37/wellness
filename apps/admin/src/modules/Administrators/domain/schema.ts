import * as yup from 'yup';
import { Asserts } from 'yup';
import { Role } from '@wellness/admin-ui/common';

export const createAdminSchem = yup.object({
  name: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  dni: yup.string().required(),
  password: yup.string().required(),
  role: yup.string().oneOf([Role.ADMIN, Role.STAFF]),
});

export type CreateAdminT = Asserts<typeof createAdminSchem>;

export const updateAdminSchema = yup.object({
  name: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
});

export type UpdateAdminT = Asserts<typeof updateAdminSchema>;

export const changePasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Se requieren mínimo 8 carácteres')
    .required('Este campo es requerido'),
  repeatPassword: yup.string().required('Este campo es requerido'),
});

export type ChangePasswordSchema = Asserts<typeof changePasswordSchema>;
