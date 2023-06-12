import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentLayout({children, countComment}) {

  const cn = bem('CommentLayout');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({countComment})</div>
      {children}
    </div>
  );
}

CommentLayout.propTypes = {
  children: PropTypes.node
}

export default memo(CommentLayout);
