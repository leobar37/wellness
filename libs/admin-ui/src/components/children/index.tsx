import {
  ReactChildren,
  FunctionComponent,
  ReactElement,
  FC,
  ReactNode,
} from 'react';
import { isElement } from 'react-is';
import { warn } from '@chakra-ui/utils';
import { SafeAny } from '@wellness/common';

export type TextOrChild = string | ReactNode;
export type ChildrenOrTextProps = {
  children: TextOrChild;
  /** if children is a text */
  onText?: (text: string) => ReactNode;
  /** if children is a element */
  onElement?: (children: ReactChildren) => JSX.Element;
};

export const ChildrenOrText: FC<ChildrenOrTextProps> = ({
  children,
  onElement,
  onText,
}) => {
  const isReactElemet = isElement(children);

  warn({
    condition: !children,
    message: 'Children has not been provided',
  });
  if (!children) {
    return null;
  }
  return (
    !isReactElemet
      ? onText
        ? onText(children as string)
        : null
      : onElement
      ? onElement(children as SafeAny)
      : null
  ) as SafeAny;
};

ChildrenOrText.defaultProps = {
  onElement: (val) => val as unknown as JSX.Element,
  onText: (val) => String(val) as unknown as JSX.Element,
};
