import React from 'react';

interface NewsBodyProps {
  className: string;
}

export default function NewsBody(props: NewsBodyProps) {
  return <div className={props.className}>NewsBody</div>;
}
