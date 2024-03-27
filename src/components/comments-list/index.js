import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import getLastComment from '../../utils/get-last-comment-in-branch';
import './style.css';

function CommentsList(props) {
  const cn = bem('CommentsList');
  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('commentList.comments')} ({props.countComments})</div>
      <div className={cn('container')}>{
        props.comments.map(comment =>
          <div key={comment._id} className='CommentsList-comment' style={{marginLeft: comment.space + 'px'}}>
            {props.renderComment(comment)}
            <button className={cn('button')} onClick={() => props.onAnswer(comment, getLastComment(comment))}>
              {props.t('commentList.answer')}
            </button>
            {comment._id === props.idAndSpaceForForm.id &&
             <>{props.children}</>
            }
          </div>
        )}
      </div>
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  articleId: PropTypes.string,
  countComments: PropTypes.number,
  renderComment: PropTypes.func,
  t: PropTypes.func,
  onAnswer: PropTypes.func,
};

CommentsList.defaultProps = {
  articleId: '',
  countComments: 0,
  renderComment: () => {},
  onAnswer: () => {},
  t: () => {}
}

export default memo(CommentsList);
