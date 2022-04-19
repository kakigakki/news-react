import React from 'react';
interface NewsActionsProps {
  className: string;
}

export default function NewsActionsProps(props: NewsActionsProps) {
  return <div className={props.className}>NewsActions</div>;
}
