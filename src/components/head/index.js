import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Title from '../../title';

function Head({ title }) {
  const cn = bem('Head');

  return (
    <header className={cn()}>
      <Title title={title} />
    </header>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
