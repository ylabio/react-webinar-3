import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import dateFormater from '../../utils/date-formater';
import CommentList from '../comment-list';

function CommentItem({formData, commentsData, comment, children, currentUser, t}) {
  const cn = bem('CommentItem');

  const ref = useRef(null)

  const {changeParent, parentType} = formData;
  const {parentID, commentDepth} = commentsData;

  const childrenCommentsData = {
    ...commentsData,
    comments: comment.children,
    commentDepth: comment.children === 0 ? 0 : commentDepth + 1
  };

  const callbacks = {
    changeParent: () => changeParent('comment', comment._id)
  }

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [parentID])

  return (
    <ul className={commentDepth > 10 ? cn('depth', 'ul') : cn('ul')}>
      <li>
        <div>
          <div className={cn('user')}>
            <span className={currentUser === comment.author._id ? cn('currentUserName') : cn('userName')}>
              {comment.author.profile.name}
            </span>
            <span className={cn('userDate')}>{dateFormater(comment.dateCreate, t("comments.locale"))}</span>
          </div>
          <div className={cn('text')}>{comment.text}</div>
          <button onClick={callbacks.changeParent} className={cn('send')}>{t('comment.answer')}</button>
        </div>
        <CommentList
          formData={formData}
          commentsData={childrenCommentsData}
          t={t}
          currentUser={currentUser}>
          {children}
        </CommentList>
        {parentType === 'comment' && parentID === comment._id ? <div ref={ref}> {[children]} </div> : <></>}
      </li>
    </ul>
  )
}

CommentItem.propTypes = {
  formData: PropTypes.shape({
    changeParent: PropTypes.func,
    parentType: PropTypes.string,
  }),
  commentsData: PropTypes.shape({
    parentID: PropTypes.string,
  }),
  comment: PropTypes.shape({
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    text: PropTypes.string,
  }),
  children: PropTypes.node,
  currentUser: PropTypes.string,
  t: PropTypes.func
};

CommentItem.defaultProps = {
  formData: {
    changeParent: () => {},
    parentType: '',
  },
  commentsData: {
    parentID: ''
  }
}

export default memo(CommentItem);
