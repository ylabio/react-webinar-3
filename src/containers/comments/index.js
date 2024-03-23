import {memo, useCallback, useState, useMemo} from 'react';
// import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import {useDispatch, useSelector as useSelectorRedux, shallowEqual} from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';
import CommentsTitle from '../../components/comments-title';
import Comment from '../../components/comment';
import CommentsForm from '../../components/comments-form';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function Comments({articleId}) {
  const [activeFormId, setActiveFormId] = useState(articleId);

  // const select = useSelector((state) => ({
  //   exists: state.session.exists,
  // }));

  const redux = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items || [],
      count: state.comments.data.count,
      waiting: state.article.waiting,
    }),
    shallowEqual
  );
  // const comments = useSelectorRedux((state) => state.comments.data.items);
  const dispatch = useDispatch();
  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  const callbacks = {
    addComment: useCallback((data) => dispatch(commentsActions.add(data)), []),
    cancelComment: useCallback(() => setActiveFormId(articleId), []),
  };

  const commentsList = useMemo(
    () =>
      treeToList(listToTree(redux.comments), (item, level) => ({
        _id: item._id,
        authorName: item?.author?.profile?.name,
        authorId: item?.author?._id,
        date: item.dateCreate,
        text: item.text,
        level,
      })),
    [redux.comments]
  );
  console.log('comments', commentsList);
  //      <Comments articleId={params.id} />
  const renders = {
    comment: useCallback(
      (comment) => (
        <Comment
          comment={comment}
          isActive={comment._id === activeFormId}
          onSubmit={callbacks.addComment}
          onCancel={callbacks.cancelComment}
          // link={`/articles/${item._id}`}
        />
      ),
      [] // t
    ),
  };

  const {t} = useTranslate();

  return (
    <Spinner active={redux.waiting}>
      <CommentsTitle count={redux.count} />
      <List
        list={commentsList}
        renderItem={renders.comment}
        noBorder={true}
      />
      <CommentsForm onSubmit={callbacks.addComment} />
    </Spinner>
  );
}

export default memo(Comments);
