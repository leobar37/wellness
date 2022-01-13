import { Button, useToast, Wrap, WrapItem } from '@chakra-ui/react';
import { useModalConfirm } from '@wellness/admin-ui/ui/dialogs';
import React from 'react';

function ToastStatusExample() {
  const toast = useToast();
  const statuses = ['success', 'error', 'warning', 'info'] as const;

  return (
    <Wrap>
      {statuses.map((status, i) => (
        <WrapItem key={i}>
          <Button
            onClick={() =>
              toast({
                title: `${status} toast`,
                status: status,
                isClosable: true,
              })
            }
          >
            Show {status} toast
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
}

function Test() {
  return (
    <div>
      <ToastStatusExample></ToastStatusExample>
    </div>
  );
}

export default Test;
