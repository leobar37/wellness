import { useRef, useMemo, useEffect } from 'react';
import { SafeAny } from '@wellness/common';
import { updatedDiff } from 'deep-object-diff';
export const useChangues = (values: SafeAny) => {
  const refChanges = useRef<SafeAny>(null);
  const changes = useMemo(
    () => updatedDiff(refChanges.current, values),
    [values]
  );
  const toCompare = (values: SafeAny) => {
    refChanges.current = values;
  };

  const hasChanges = useMemo(() => Object.keys(changes).length > 0, [changes]);

  return {
    hasChanges,
    toCompare,
    changes,
  };
};
