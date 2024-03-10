import {memo} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({title, children}) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      <div className={cn('container')}>{children}</div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node
};

export default memo(Head);
