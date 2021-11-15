import { Children } from 'react';
import * as React from 'react';
import { isFragment } from 'react-is';
export interface Option {
  keepEmpty?: boolean;
}

export const toArray = (
  children: React.ReactChildren,
  option: Option = {}
): React.ReactElement[] => {
  let ret: React.ReactElement[] = [];
  React.Children.forEach(children, (child: any) => {
    if (child === undefined || (child === null && !option.keepEmpty)) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child as any));
    } else if (isFragment(children) && child.props) {
      ret = ret.concat(toArray(child, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
};

export default function canUseDom() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}
