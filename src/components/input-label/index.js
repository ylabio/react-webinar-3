import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function InputLabel({name, title, children}) {
  const cn = bem('ImputLabel')

  return (
    <div className={cn()}>
      <label name={name} className={cn('title')}>{title}</label>
      <div className={cn('container')}>{children}</div>
    </div>
  );
};

InputLabel.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
}

export default memo(InputLabel);