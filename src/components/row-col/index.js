import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('RowCol');

const Row = ({ children }) => {
  return <div className={cn('row')}>{children}</div>;
};

const Col = ({ children }) => {
  return <div className={cn('col')}>{children}</div>;
};

export { Row, Col };