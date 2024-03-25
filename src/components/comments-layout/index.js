import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css'

function CommentsLayout({children, title, count}) {

  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <span>{title} ({count})</span>
      </div>
      <div className={cn('content')}>{children}</div>
    </div>
  )
}

CommentsLayout.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  children: PropTypes.node,
};

export default memo(CommentsLayout);
