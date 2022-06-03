import * as yup from 'yup';
import { Asserts } from 'yup';
import { Role } from '@wellness/admin-ui/common';

export const createAdminSchem = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  lastName: yup.string().required(),
  dni: yup.string().nullable(),
  password: yup.string().required(),
  role: yup.string().oneOf([Role.ADMIN, Role.STAFF]),
});

export type CreateAdminT = Asserts<typeof createAdminSchem>;

export const updateAdminSchema = yup.object({
  name: yup.string().required('El nombre es un campo requerido'),
  lastName: yup.string().required('El apellido es un campo requerido'),
  email: yup.string().email().required('El email es un campo requerido'),
});

export type UpdateAdminT = Asserts<typeof updateAdminSchema>;

export const changePasswordSchema = yup.object({
  prevPassword: yup.string().required('La contraseña es un campo requerido'),
  password: yup
    .string()
    .min(8, 'Se requieren mínimo 8 carácteres')
    .required('Este campo es requerido'),
  repeatPassword: yup.string().required('Este campo es requerido'),
});

export const changePasswordSchemaFromAdmin = yup.object({
  adminPassword: yup.string().required('Su contraseña es un campo requerido'),
  password: yup
    .string()
    .min(8, 'Se requieren mínimo 8 carácteres')
    .required('Este campo es requerido'),
  repeatPassword: yup.string().required('Este campo es requerido'),
});

export type ChangePasswordSchema = Asserts<typeof changePasswordSchema>;
export type ChangePasswordSchemaFromAdmin = Asserts<
  typeof changePasswordSchemaFromAdmin
>;
