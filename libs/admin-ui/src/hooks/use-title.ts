import { useState } from 'react';
import { useSafeLayoutEffect } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const useTitleApi = (initialTitle = '') => {
  const [title, _setTitle] = useState(initialTitle);

  useSafeLayoutEffect(() => {
    document.title = title;
  }, [title]);

  const setTitle = (title: string) => {
    _setTitle(title);
  };

  return {
    setTitle,
    title,
  };
};
