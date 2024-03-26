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

  useInit(() => {
    dispatch(commentsActions.load(productId));
  }, []);

  const {t} = useTranslate();

  const dispatch = useDispatch();

  let [activeComment, setActiveComment]=useState(null)

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
  }), shallowEqual);

  const select = useSelector(state => ({
    user: state.session.user,
    activeUserName:state.session.user.profile?.name
  }));

  function resetCurrentForm(){
    setActiveComment(null)
  }

  function addNewComment(comment,type = 'article'){
    dispatch(commentsActions.addComment(productId,type,comment,select.activeUserName))
  }

  function addAnswerComment(comment,commentId,type = 'comment'){
    dispatch(commentsActions.addComment(commentId,type,comment,select.activeUserName))
  }
  
  const renders = {
    comment: useCallback(comment => {
      let data={
        author:comment.author.profile.name,
        text:comment.text,
        dateCreate:formatDate(comment.dateCreate),
        id:comment._id,
        indentation:comment.level-1
      }
      return ( 
      <Comment data={data} current={activeComment} isAuth={select.activeUserName} setActiveComment={setActiveComment} 
      resetCurrentForm={resetCurrentForm} addAnswerComment={addAnswerComment} t={t}/>
    )}, [activeComment,select.activeUserName,t]),
  };

  const options = {
    comments: useMemo(() => ([
      ...treeToList(listToTree(selectRedux.comments), (item, level) => (
        {...item, level:level>=10?10:level}
      ))
    ].slice(1)), [selectRedux.comments]),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <Comments t={t} list={options?.comments} renderItem={renders.comment}/>
      {!activeComment && <CommentsForm t={t} productId={selectRedux.comments} addNewComment={addNewComment} isAuth={select.activeUserName}/>}
    </Spinner>
  );
}

export default memo(CatalogList);
