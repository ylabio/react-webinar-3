import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import shallowequal from 'shallowequal';
import useSelectorStore from '../../hooks/use-selector';
import CommentAction from '../../components/comment-action';
import LadderList from '../../components/ladder-list';
import CommentsLayout from '../../components/comments-layout';
import CommentItem from '../../components/comment-item';
import Spinner from '../../components/spinner';
import useLocale from '../../hooks/use-locale';
import { listFromFlat } from '../../utils/list-from-flat/list-from-flat';

function ArticleComments() {

  const { t, locale } = useLocale()
  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      commentsCount: state.comments.count,
      commentsWaiting: state.comments.waiting,
/*      commentsReplyTarget: state.comments.replyTarget,*/
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект


  const selectStore = useSelectorStore(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const comments = useMemo(
    () => listFromFlat(select.comments || []),
    [select.comments]
  );

  const [addComment, setAddComment] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const dispatch = useDispatch();


  const location = useLocation();
  const replyTo = location.state?.replyTo;
  console.log("location.replyTo", replyTo)


  useEffect(() => {
    // Автоскролл до формы ответа, если она появилась
    const target = document.getElementById('reply');

    console.log("location.target", target)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [select.comments]); // каждый раз, когда список комментариев меняется


  useEffect(() => {
    if (!replyTo) return;

    const didScroll = { current: false }; // локально внутри эффекта — сбрасывается на каждый новый replyTo

    const timeout = setTimeout(() => {
      console.log('2123214location.targetreplyTo', replyTo);
      const target = document.getElementById(`comment-${replyTo}`);
      console.log('123123123location.target', target);

      if (target && !didScroll.current) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        didScroll.current = true;
      }
    }, 2000); // Подождать, пока DOM обновится

    return () => clearTimeout(timeout);
  }, [replyTo]);






  const callbacks = {
    addToAnswer: useCallback(comment => {
      setAddComment(true)
      setCommentValue(`Мой ответ для ${comment.author} `)
      dispatch(commentsActions.setReplyTarget2(comment, selectStore.user))
    }, []),

    cancelToAnswer: useCallback(() => {
      setAddComment(false)
      setCommentValue('');
      dispatch(commentsActions.removeReplyPlaceholder())

    }, []),

    addApiToAnswer: useCallback((parent) => {
      dispatch(commentsActions.addComment(parent, commentValue, () => dispatch(commentsActions.load(select.article._id))));
    }, [parent, commentValue]),
  };



  const backLink = location.pathname;

  const renders = {
    item: useCallback(
      item => (
        <>
          {item.value !== 'reply' && <CommentItem
            active={addComment === item.value}
            comment={item}
            my={selectStore.user._id === item.authorId}
            onStartReply={() => callbacks.addToAnswer(item)}
            onCancelReply={() => callbacks.cancelToAnswer()}
            t={t}
            locale={locale}
          />}
          {item.value === 'reply' &&
            renders.action({
              id: item.parent._id,
              isReply: true,
              onAdd: () =>
                callbacks.addApiToAnswer(item.parent),
              cancel: callbacks.cancelToAnswer,
            })}
        </>
      ),
      [addComment, commentValue, selectStore, t, callbacks],
    ),

    action: ({ isReply, onAdd, cancel, id }) => (
      <CommentAction
        id={id}
        t={t}
        auth={selectStore.exists}
        backLink={backLink}
        isReply={isReply}
        link="/login"
        value={commentValue}
        setValue={setCommentValue}
        onAdd={onAdd}
        cancel={cancel}
      />
    ),
  };

  return (
    <Spinner active={select.waiting}>    <CommentsLayout title={`${t('comment.title')} (${select.commentsCount})`}>
      {comments && <LadderList list={comments} renderItem={renders.item}/>}
      {!addComment && renders.action({
        isReply: false,
        onAdd: () =>
          callbacks.addApiToAnswer({
            _id: select.article._id,
            _type: 'article',
          }),
        cancel: callbacks.cancelToAnswer,
      })}
    </CommentsLayout>
    </Spinner>

  );
}

export default memo(ArticleComments);
