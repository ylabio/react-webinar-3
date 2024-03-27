import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsLayout({count, children}) {

  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <div>Комментарии ({count})</div>
      </div>

      <div className={cn('items')}>
        {children}
      </div>

    </div>
  )
}

CommentsLayout.propTypes = {
  count: PropTypes.number,
  children: PropTypes.node,
}

export default memo(CommentsLayout);