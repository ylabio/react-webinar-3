import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Main = ({ children }) => {
  const cn = bem('Main');
  return <main className={cn()}>{children}</main>;
};

export default Main;

Main.propTypes = {
  children: PropTypes.node,
};
