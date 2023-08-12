import React, { ReactNode } from 'react';

interface IContentProps {
  children: ReactNode;
}

export function Content({ children }: IContentProps) {
  return <main>{children}</main>;
}
