import * as yup from 'yup';
import { Asserts } from 'yup';
import { ModeSuscription } from '@wellness/admin-ui/common';

export const createActivitySchema = yup.object({
  visible: yup.boolean().required().default(true),
  name: yup.string().required().max(40),
  description: yup.string().required().max(120),
  price: yup.number().required(),
  duration: yup.number().min(5).required(),
  mode: yup.mixed().oneOf([ModeSuscription.DINAMIC, ModeSuscription.FIXED]),
  startAt: yup.date().required(),
});

export type CreateActivity = Asserts<typeof createActivitySchema>;

export const createPlanSchema = yup.object({
  visible: yup.boolean().required().default(true),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  duration: yup.number().min(5).required(),
  active: yup.boolean().required().default(true),
});

export type CreatePlan = Asserts<typeof createPlanSchema>;
