import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import LangSwitch from '../langSwitch';
import './style.css';

function Head({ title }) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1>{title}</h1>
        <LangSwitch />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
