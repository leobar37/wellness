import { ReactChildren, FunctionComponent, ReactElement } from 'react';
import { isElement } from 'react-is';
import { warn } from '@chakra-ui/utils';
export type TextOrChild = string | ReactChildren;

export const ChildrenOrText: FunctionComponent<{
  children: TextOrChild;
  onText?: (text: string) => JSX.Element;
  onElement?: (children: ReactChildren) => JSX.Element;
}> = ({ children, onElement, onText }) => {
  console.log(children);

  const isReactElemet = typeof children !== 'string';
  warn({
    condition: !children,
    message: 'Children has not been provided',
  });
  if (!children) {
    return null;
  }
  return !isReactElemet
    ? onText
      ? onText(children as string)
      : null
    : onElement
    ? onElement(children as ReactChildren)
    : null;
};

ChildrenOrText.defaultProps = {
  onElement: (val) => val as unknown as JSX.Element,
  onText: (val) => String(val) as unknown as JSX.Element,
};
