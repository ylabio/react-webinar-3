import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';


function Head({ title = "Ожидайте", children , loading=false}) {
  const cn = bem('Head');
  return (
    <div className={cn({loading:loading})}>
      <div className={cn('container')}>
        <h1 >{title}</h1>
        {children}
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default memo(Head);
