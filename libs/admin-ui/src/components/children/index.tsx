import {
  ReactChildren,
  FunctionComponent,
  ReactElement,
  FC,
  ReactNode,
} from 'react';
import { isElement } from 'react-is';
import { warn } from '@chakra-ui/utils';

export type TextOrChild = string | ReactNode;
export type ChildrenOrTextProps = {
  children: TextOrChild;
  /** if children is a text */
  onText?: (text: string) => JSX.Element;
  /** if children is a element */
  onElement?: (children: ReactChildren) => JSX.Element;
};

export const ChildrenOrText: FC<ChildrenOrTextProps> = ({
  children,
  onElement,
  onText,
}) => {
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
