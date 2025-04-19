import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';
import CommentForm from '../comment-form';
import useSelector from '../../hooks/use-selector';
import { useSelector as useSelectorRedux } from 'react-redux';
import CommentList from '../../components/comment-list';
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';

function Comment({ count = 0, comments }) {
  const cn = bem('Comment');

  const {t} = useTranslate();

  const selectCommentForm = useSelectorRedux(
    state => ({
      place: state.commentForm.place,
    }),
    shallowequal,
  );

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  return (
    <div className={cn()}>
      {/* ДОБАВИТЬ ДИНАМИЧЕСКОЕ ОТОБРАЖЕНИЕ КОЛЛИЧЕСТВА КОММЕНТАРИЕВ */}
      <h1 className={cn('title')}>{t('comment')} ({count})</h1>
      <CommentList comments={comments} />
      {select.exists ? (
        selectCommentForm.place.match(/^common$/) && <CommentForm />
      ) : (
        <div className={cn('unauthorized')}>
          <Link to="/login" className={cn('link-login')}>
            {t('comment.login')}
          </Link>
          {t('comment.login-able-to-comment')}
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  children: PropTypes.node,
};

export default memo(Comment);
