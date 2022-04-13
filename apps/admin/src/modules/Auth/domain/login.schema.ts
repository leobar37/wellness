import * as yup from 'yup';
import { Asserts } from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type LoginInputType = Asserts<typeof loginSchema>;
