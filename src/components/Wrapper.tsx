import React, { ReactNode } from 'react';

interface IWrapperProps {
  className: string;
  children: ReactNode;
}
export default function Wrapper(props: IWrapperProps) {
  let { className, children } = props;
  className += ' bg-[#F0F2F5] min-h-screen';
  return <div className={className}>{children}</div>;
}
