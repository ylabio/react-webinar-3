import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import formatISODateToCustomString from '../../utils/format-iso-date';

import './style.css';
import CommentList from '../comment-list';
import CommentForm from '../comment-form';
import { useDispatch } from 'react-redux';
import commentFormActions from '../../store-redux/comment-form/actions';
import { useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';

function CommentItem({ item }) {
  const cn = bem('CommentItem');
  const dispatch = useDispatch();
  const { t } = useTranslate();

  const selectCommentForm = useSelector(
    state => ({
      place: state.commentForm.place,
    }),
    shallowequal,
  );

  return (
    <>
      <div className={cn()}>
        <div className={cn('head')}>
          <span className={cn('name')}>{item.author.profile.name}</span>
          <span className={cn('date')}>{formatISODateToCustomString(item.dateCreate)}</span>
        </div>
        <p className={cn('text')}>{item.text}</p>
        <button
          className={cn('button')}
          onClick={() => dispatch(commentFormActions.change(item._id))}
        >
          {t("comment-item.reply")}
        </button>
      </div>
      {item.children.length !== 0 && (
        <CommentList
          comments={item.children.map(el => ({ ...el, level: item.level + 1 }))}
          curLevel={item.level + 1}
        />
      )}
      {selectCommentForm.place === item._id && <CommentForm replyName={item.author.profile.name} />}
    </>
  );
}

Comment.propTypes = {};

export default memo(CommentItem);
