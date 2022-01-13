import { useToast, UseToastOptions } from '@chakra-ui/react';

export const useWellnessToast = () => {
  const toast = useToast();
  const call = (opts: UseToastOptions) => {
    toast({
      position: 'top',
      isClosable: true,
      status: 'success',
      ...opts,
    });
  };

  return call;
};
