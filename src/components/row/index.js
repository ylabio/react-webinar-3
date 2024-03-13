import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Row(props) {
  const { children } = props;

  const cn = bem('Row');
  return <div className={cn()}>{children}</div>;
}

Row.propTypes = {
  children: PropTypes.node,
};

export default memo(Row);
