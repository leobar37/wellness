/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';
export const applyYupLocale = () => {
  setLocale({
    mixed: {
      required: 'Este campo es requerido',
    },
    string: {
      email: 'Ingrese un email valido',
      length: 'Este campo debe tener ${length} caracteres',
      min: 'Este campo debe tener al menos ${min} caracteres',
      max: 'Este campo debe tener como maximo ${max} caracteres',
    },
    number: {
      min: 'Este campo debe tener como minimo ${min}',
      max: 'Este campo debe tener como maximo ${max}',
    },
  });
};
