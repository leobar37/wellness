import { useState, useEffect } from 'react';
import { someBoolean } from '@wellness/common';

export const useSomeTruthy = (...arr: boolean[]) => {
  const [isTruthy, setIsTruthy] = useState(() => someBoolean(...arr));
  useEffect(() => {
    setIsTruthy(someBoolean(...arr));
  }, [arr]);

  return isTruthy;
};
