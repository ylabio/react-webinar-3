import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentList from '../comment-list';
import { NavLink } from 'react-router-dom';
import CommentForm from '../comment-form';
import './style.css';

function CommentSection(props) {
  const cn = bem('CommentSection');
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <h2>{props.t('comment.comments')}: {props.count}</h2>
      </div>
      {props.comments && props.comments.length !== 0 &&
        <CommentList list={props.comments} renderItem={props.renderItem} />
      }
      {props.replyingTo === null &&
        <>
          {props.session.exists ?
            <CommentForm
              parentId={props.articleId}
              type='article'
              onReply={props.onReply}
              onSubmit={props.handleCommentSubmit}
              t={props.t} />
            :
            <div className={cn('footer')}>
              <NavLink to="/login">Войдите</NavLink>, чтобы иметь возможность комментировать
            </div>
          }
        </>
      }

    </div>
  )
}

CommentSection.propTypes = {
  count: PropTypes.number,

};


export default memo(CommentSection);
