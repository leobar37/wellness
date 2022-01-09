import { Button } from '@chakra-ui/react';
import { useModalConfirm } from '@wellness/admin-ui/ui/dialogs';
import React from 'react';

function Test() {
  const confirm = useModalConfirm();
  return (
    <div>
      <Button
        onClick={() => {
          confirm({
            onClose: () => {
              console.log('close modal');
            },
            onConfirm: () => {
              console.log('confirm modal');
            },
          });
        }}
      >
        Click me
      </Button>
    </div>
  );
}

export default Test;
