import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Title({ title }) {
  const cn = bem('Title');

  return (
    <>
      <h1 className={cn()}>{title}</h1>
    </>
  );
}

Title.propTypes = {
  title: PropTypes.node,
};

export default Title;
