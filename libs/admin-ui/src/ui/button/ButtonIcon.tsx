import { Button, ButtonProps, Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
export const ButtonIcon: FunctionComponent<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button {...props} width="35px" height="35px">
      {children}
    </Button>
  );
};
