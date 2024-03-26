import { memo, useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import commentsActions  from "../../store-redux/comments/actions";
import { useNavigate, useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import shallowequal from "shallowequal";
import Spinner from "../../components/spinner";
import CommentsContainer from "../comments-container";
import CommentsLayout from "../../components/comments-layout";
import useSelector  from '../../hooks/use-selector';
import CommentsCount from "../../components/comments-count";
import commentsTree from "../../utils/comments-tree";
import RenderComments from "../render-comments";


function CommentsList() {


  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();
  const selectStore = useSelector((state) => ({
    session: state.session.token,
    user: state.session.user
  }))

  const [activeItems, setActiveItems] = useState(null);
  const [activeCommentId, setActiveCommentId] = useState(null);

  useEffect(() => {
    scrollToActiveComment();
  }, [activeCommentId]);


  const scrollToActiveComment = () => {
    if (activeCommentId) {
      const commentElement = document.getElementById(activeCommentId);
      if (commentElement) {
        commentElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waiting: state.comments.waiting
  }), shallowequal)

  useInit( () => {
    dispatch(commentsActions.load(params.id));
  }, [params.id] );

  const callbacks = {
    onResetId: useCallback(() => {
      setActiveItems(null);
    }, []),
    setId: useCallback((id) => {
      setActiveItems(id);
    }, [activeItems]),
    signIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    sendComment: useCallback((id, text, type) => {
      console.log(id, text, type)
      if (text.trim()) {
        dispatch(commentsActions.postComment({text, parent: {_id: id ?? params.id, _type: type}}))
      }
      setActiveItems(null);
    }, [])
  }

  return (
    <div style={{paddingBottom: '95px'}}>
      <CommentsCount count={select.count}/>
      <Spinner active={select.waiting}>
        { select.comments.length > 0 && <RenderComments comments={commentsTree(select.comments)} level={1} onResetId={callbacks.onResetId} onSignIn={callbacks.signIn} setId={callbacks.setId} activeItems={activeItems} session={selectStore.session} onSendComment={callbacks.sendComment} setActiveCommentId={setActiveCommentId}/>}
        <CommentsLayout level={1}>
          {!activeItems && <CommentsContainer id={activeItems} session={selectStore.session} onResetId={callbacks.onResetId}  onSignIn={callbacks.signIn} onSendComment={callbacks.sendComment} type={"article"}/>}
        </CommentsLayout>
      </Spinner>
    </div>
  )
}

export default memo(CommentsList);