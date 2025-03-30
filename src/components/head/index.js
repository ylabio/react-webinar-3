import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Title from '../title';

function Head() {
  const cn = bem('Head');

  return (
    <header className={cn()}>
      <Title title="Магазин" />
    </header>
  );
}

export default React.memo(Head);
