import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsTitle(props) {
  const cn = bem('CommentsTitle');
  return (
    <div className={cn('')}>
      {props.title} ({props.count})
    </div>
  );
}

CommentsTitle.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default memo(CommentsTitle);
