import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector as useSelectorRedux, useStore} from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import commentsActions from '../../store-redux/comments/actions';
import Comments from '../../components/comments';
import Comment from '../../components/comment';
import useInit from '../../hooks/use-init';
import shallowEqual from 'shallowequal';
import { formatDate } from '../../utils/format-date';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import CommentsForm from '../../components/comments-form';
import useSelector from '../../hooks/use-selector';

function CatalogList({productId}) {
  const store = useStore();
  const dispatch = useDispatch();

  let [activeComment, setActiveComment]=useState(null)
  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
  }), shallowEqual); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector(state => ({
    user: state.session.user
  }));
  const activeUserName=select.user?.profile?.name

  function resetCurrentForm(){
    setActiveComment(null)
  }
  
  useInit(() => {
    dispatch(commentsActions.load(productId));
  }, []);

  const {t} = useTranslate();

  const renders = {
    comment: useCallback(comment => (
      <Comment author={comment.author.profile.name} text={comment.text} dateCreate={formatDate(comment.dateCreate)} 
      id={comment._id} current={activeComment} isAuth={activeUserName} setActiveComment={setActiveComment} 
      resetCurrentForm={resetCurrentForm} addAnswerComment={addAnswerComment}/>
    ), [activeComment,t]),
  };

  function addNewComment(comment,type = 'article'){
    dispatch(commentsActions.addComment(productId,type,comment,activeUserName))
  }
  function addAnswerComment(comment,commentId,type = 'comment'){
    dispatch(commentsActions.addComment(commentId,type,comment,activeUserName))
  }

  return (
    <Spinner active={selectRedux.waiting}>
      <Comments list={selectRedux.comments} renderItem={renders.comment}/>
      {!activeComment&& <CommentsForm productId={selectRedux.comments} addNewComment={addNewComment} isAuth={activeUserName}/>}
    </Spinner>
  );
}

export default memo(CatalogList);
