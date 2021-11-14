import * as React from 'react';
import { BaseLayout } from '@wellness/admin-ui/components';
import { Button } from '@chakra-ui/react';
function Index() {
  return (
    <BaseLayout actions={<Button>crear</Button>} backText="Hello world">
      <h1>Hello world</h1>
    </BaseLayout>
  );
}

export default Index;
