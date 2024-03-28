import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ContentLayout (props) {

  const cn = bem('ContentLayout');

  return (
    <div className={cn({padding: props.padding})}>{props.children}</div>
  );

}

ContentLayout.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.oneOf(['small', 'medium']),
}

export default memo(ContentLayout);