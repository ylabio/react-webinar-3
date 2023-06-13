import { memo } from "react"
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';


function CommentsLayout({length, children}){
  const cn = bem('CommentsLayout');

return (
  <div className={cn('container')}>
    <h2 className={cn('header')}>Комментарии ({length})</h2>
  <div className={cn('content')}>{children}</div>
  </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
};

CommentsLayout.defaultProps = {
  count: 0,
}

export default memo(CommentsLayout)