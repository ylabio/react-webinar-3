import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsTitle({count}) {
  const cn = bem('CommentsTitle');
  return (
    <h2 className={cn()}>
      {'Комментарии'}&nbsp;{'(' + count + ')'}
    </h2>
  );
}

CommentsTitle.propTypes = {
  count: PropTypes.number,
};

CommentsTitle.defaultProps = {
  count: 0,
};

export default memo(CommentsTitle);
