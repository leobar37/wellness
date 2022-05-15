import { setLocale } from 'yup';

export const applyYupLocale = () => {
  setLocale({
    mixed: {
      required: 'Este campo es requerido',
    },
    number: {
      min: ({ min }) => `El valor debe ser mayor o igual a ${min}`,
    },
  });
};
