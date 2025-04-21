import { memo, useCallback, useMemo, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import shallowequal from 'shallowequal';
import useSelectorStore from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentAction from '../../components/comment-action';
import LadderList from '../../components/ladder-list';
import CommentsLayout from '../../components/comments-layout';
import CommentItem from '../../components/comment-item';
import Spinner from '../../components/spinner';
import useLocale from '../../hooks/use-locale';

function ArticleComments() {

  const { t, locale } = useLocale()
  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      commentsCount: state.comments.count,
      commentsWaiting: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект


  const selectStore = useSelectorStore(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const options = listToTree(select.comments || []);

  const test = options?.[0]?.children || [];

  const comments = useMemo(
    () => [
      ...treeToList(test, (item, level) => ({
        value: item._id,
        level: level,
        text: item.text,
        author: item.author?.profile?.name,
        authorId: item.author?._id,
        dateCreate: item.dateCreate,
        parent: item.parent,
      })),
    ],
    [select.comments],
  );

  const [addComment, setAddComment] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const dispatch = useDispatch();

  const callbacks = {
    addToAnswer: useCallback(id => {
      setCommentValue('')
      setAddComment(id)}, []),
    cancelToAnswer: useCallback(() => {
      setAddComment('');
      setCommentValue('');
    }, []),

    addApiToAnswer: useCallback((parent) => {
      dispatch(commentsActions.addComment(parent, commentValue, () => dispatch(commentsActions.load(select.article._id))));
    }, [parent, commentValue]),

  };

  const location = useLocation();

  const backLink = location.pathname;

  const renders = {
    item: useCallback(
      item => (
        <>
          <CommentItem
            active={addComment === item.value}
            comment={item}
            my={selectStore.user._id === item.authorId}
            onStartReply={() => callbacks.addToAnswer(item.value)}
            onCancelReply={() => callbacks.cancelToAnswer()}
            t={t}
            locale={locale}
          />
          {addComment === item.value &&
            renders.action({
              isReply: true,
              onAdd: () =>
                callbacks.addApiToAnswer({
                  _id: item.value,
                  _type: 'comment',
                }),
              cancel: callbacks.cancelToAnswer,
            })}
        </>
      ),
      [addComment, commentValue, selectStore, t, callbacks],
    ),

    action: ({ isReply, onAdd, cancel }) => (
      <CommentAction
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
      {addComment === '' && renders.action({
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
