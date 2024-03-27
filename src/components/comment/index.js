import { memo } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import './style.css'

function Comment({author, authorStyle, date, text, style, onClick, children, t}) {
  
  const cn = bem('Comment')

  return (
    <div style={style} className={cn()}>
      <span style={authorStyle} className={cn('author')}>{author}</span>
      <span className={cn('date')}>{date}</span>
      <div className={cn('text')}>{text}</div>
      <Link onClick={onClick}>{t('comment.answer')}</Link>
      <div className={cn('children')}>{children}</div>
    </div>
  )
}

Comment.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Comment.defaultProps = {
  onClick: () => {
  }
}

export default memo(Comment);
