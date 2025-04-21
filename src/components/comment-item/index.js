import { memo, useEffect, useRef, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import formatISODateToCustomString from '../../utils/format-iso-date';

import './style.css';
import CommentList from '../comment-list';
import CommentForm from '../comment-form';
import { useDispatch } from 'react-redux';
import commentFormActions from '../../store-redux/comment-form/actions';
import { useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';

function CommentItem({ item }) {
  const cn = bem('CommentItem');
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const ref = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (shouldScroll) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const selectCommentForm = useSelectorRedux(
    state => ({
      place: state.commentForm.place,
    }),
    shallowequal,
  );

  const scrollToTarget = () => {
    setShouldScroll(true);
  };

  return (
    <>
      <div className={cn()}>
        <div className={cn('head')}>
          <span
            className={`${cn('name')} ${item.author._id === select.user._id ? ' auth-user-name' : ''}`}
          >
            {item.author?.profile?.name || select.user.profile.name}
          </span>
          <span className={cn('date')}>{formatISODateToCustomString(item.dateCreate)}</span>
        </div>
        <p className={cn('text')}>{item.text}</p>
        <button
          className={cn('button')}
          onClick={() => {
            dispatch(commentFormActions.change(item._id));
            scrollToTarget();
          }}
        >
          {t('comment-item.reply')}
        </button>
      </div>
      {item.children.length !== 0 && (
        <CommentList
          comments={item.children.map(el => ({ ...el, level: item.level + 1 }))}
          curLevel={item.level + 1}
        />
      )}
      {selectCommentForm.place === item._id && (
        <div className={cn('form')} ref={ref}>
          <CommentForm />
        </div>
      )}
    </>
  );
}

Comment.propTypes = {};

export default memo(CommentItem);
