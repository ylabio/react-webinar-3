import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls({children}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Controls.propTypes = {
  children: PropTypes.node
};

export default React.memo(Controls);
