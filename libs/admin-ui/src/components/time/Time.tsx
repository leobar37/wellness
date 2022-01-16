import { FC } from 'react';
import formatFn from 'date-fns/format';
import { SafeAny } from '@wellness/common';
/**
 * TODO:
 * - add diferents presentation for this component
 */

export type TimeProps = {
  children: Date | string | number;
  format?: string;
  variant?: 'ago' | 'date' | 'time' | 'timeAndDate';
};

export const Time: FC<TimeProps> = ({ children, format, variant }) => {
  let date: SafeAny = children;
  const isNorm = date instanceof Date;
  if (!isNorm) {
    date = new Date(children);
  }
  return <>{formatFn(date, format || '')}</>;
};

Time.defaultProps = {
  children: new Date(),
  format: 'yyyy/MM/dd',
  variant: 'date',
};
