import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import CommentsWrapper from '../../components/comments-wrapper';
import CommentList from '../../components/comment-list';
import shallowEqual from 'shallowequal';
import useSelector from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree/index';
import CommentField from '../../components/comment-field';
import commentsActions from '../../store-redux/comments/actions'

function CommentsContainer() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslate();
  
  const commentDepth = 0;
  const [commentText, setCommentText] = useState('');
  
  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    parentType: state.comments.parentType,
    parentID: state.comments.parentID,
  }), shallowEqual);
  
  const currentId = selectRedux.parentID === '' ? params.id : selectRedux.parentID

  const select = useSelector((state) => ({
    exists: state.session.exists,
    userId: state.session.user._id
  }))  
  
  const callbacks = {
    sendComment: () => dispatch(commentsActions.sendComment(commentText, currentId, selectRedux.parentType)),
    changeParent: (type, id) => dispatch(commentsActions.changeParent(type, id), setCommentText('')),
    onSignIn: useCallback(() => {navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname])  
  }

  const commentsTree = {
    comments: useMemo(() => ([
      ...listToTree([{ _id: params.id, parent: null }, ...selectRedux.comments])
    ]))
  }

  const formData = {
    parentType: selectRedux.parentType,
    changeParent: callbacks.changeParent,
    sendComment: callbacks.sendComment,
  }

  const commentsData = {
    parentID: selectRedux.parentID,
    comments: commentsTree.comments[0].children,
    commentText,
    commentDepth,
    setCommentText,
  }

  return (
    <CommentsWrapper commentsAmount={selectRedux.comments.length} t={t}>
      <CommentList
        t={t}
        formData={formData}
        commentsData={commentsData}
        currentUser={select.userId}
      >
        <CommentField
          t={t}
          formData={formData}
          commentsData={commentsData}
          exists={select.exists}
          onSignIn={callbacks.onSignIn}
        />
      </CommentList>
      {selectRedux.parentType === 'article' &&
        <CommentField
          t={t}
          formData={formData}
          commentsData={commentsData}
          exists={select.exists}
          onSignIn={callbacks.onSignIn}
        />
      }  
    </CommentsWrapper>
  );
}
  
  export default memo(CommentsContainer);