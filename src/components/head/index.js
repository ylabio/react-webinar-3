import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title }) {
  const cn = bem('Head');

  return (
    <header className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
    </header>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
