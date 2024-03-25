import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CreateComment from '../../containers/create-comment';
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
            <button className={cn('button')} onClick={() => props.setCurrentCommentId(comment._id)}>{props.t('commentList.answer')}</button>
            {comment._id === props.currentCommentId &&
              <CreateComment
                t={props.t}
                isComment={true}
                title={props.t('createComment.newAnswer')}
                parentType='comment'
                currentCommentId={props.currentCommentId}
                setCurrentCommentId={props.setCurrentCommentId}
                articleId={props.articleId}
            />}
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
  currentCommentId: PropTypes.string,
  renderComment: PropTypes.func,
  setCurrentCommentId: PropTypes.func,
  t: PropTypes.func
};

CommentsList.defaultProps = {
  articleId: '',
  countComments: 0,
  currentCommentId: '',
  renderComment: (comment) => {
  },
  setCurrentCommentId: () => {
  },
  t: (text) => text
}

export default memo(CommentsList);
