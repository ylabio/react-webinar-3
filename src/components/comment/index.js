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

  return (
    <div className={cn()}>
      {/* ДОБАВИТЬ ДИНАМИЧЕСКОЕ ОТОБРАЖЕНИЕ КОЛЛИЧЕСТВА КОММЕНТАРИЕВ */}
      <h1 className={cn('title')}>{t('comment')} ({count})</h1>
      <CommentList comments={comments} />
      {selectCommentForm.place === 'common' && <CommentForm />}
    </div>
  );
}

Comment.propTypes = {
  children: PropTypes.node,
};

export default memo(Comment);
