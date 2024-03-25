import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import './style.css';


function HeadComments (props) {

  const cn = bem('HeadComments');
  
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.title} ({numberFormat(props.count)})</h2>
    </div>
  );
}

HeadComments.propTypes = {
  title: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(HeadComments);