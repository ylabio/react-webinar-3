import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function KeyValueList({ children }) {
  const cn = bem('KeyValueList');
  return <dl className={cn()}>{children}</dl>;
}

KeyValueList.propTypes = {
  children: PropTypes.node,
};

KeyValueList.defaultProps = {};

export default memo(KeyValueList);
