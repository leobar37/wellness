import * as React from 'react';
type PriceProps = {
  children?: number | string;
};
export const Price: React.FunctionComponent<PriceProps> = ({ children }) => {
  return <>{children} s/.</>;
};
