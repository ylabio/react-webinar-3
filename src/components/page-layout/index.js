import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const PageLayout = ({ children }) => {
  const cn = bem('PageLayout');

  return <section className={cn()}>{children}</section>;
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
