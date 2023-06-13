import {memo} from 'react'
import {cn as bem} from '@bem-react/classname';
import CommentsFormContainer from '../../containers/comments-form-container';
import PropTypes from 'prop-types';
import './style.css';

function CommentsLayout({children, count, isReply,t}) {
  const cn = bem('CommentLayout')

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{t('article.comments')} ({count})</h3>

      <div className={cn('comments')}>
        {children}
      </div>
      
      {!isReply && <CommentsFormContainer />}
    </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
  isReply: PropTypes.bool,
  t: PropTypes.func
}

CommentsLayout.defaultProps = {
  t: () => {}
}

export default memo(CommentsLayout)