import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function KeyValueItem(props) {
  const cn = bem('KeyValueItem');
  return (
    <div className={cn()}>
      <dt className={cn('key')}>{props.itemKey}</dt>
      <dd className={cn('value')}>{props.value}</dd>
    </div>
  );
}

KeyValueItem.propTypes = {
  itemKey: PropTypes.string,
  value: PropTypes.string,
};

KeyValueItem.defaultProps = {};

export default memo(KeyValueItem);
