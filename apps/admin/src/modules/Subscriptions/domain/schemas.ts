import * as yup from 'yup';
import { Asserts } from 'yup';
import { ModeSuscription } from '@wellness/admin-ui/common';

export const createActivitySchema = yup.object({
  visible: yup.boolean().required().default(true),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  duration: yup.number().required(),
  mode: yup.mixed().oneOf([ModeSuscription.DINAMIC, ModeSuscription.FIXED]),
  startAt: yup.date().required(),
});

export type CreateActivity = Asserts<typeof createActivitySchema>;
