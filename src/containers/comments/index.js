import React, {useCallback, useMemo} from 'react';
import Spinner from "../../components/spinner";
import CommentsList from "../../components/comments-list";
import CommentReplier from "../comment-replier";
import {useDispatch, useSelector} from "react-redux";
import useSelectorStore from '../../hooks/use-selector';
import shallowequal from "shallowequal";
import listToTree from "../../utils/list-to-tree";
import {useParams} from "react-router-dom";
import commentReplierActions from "../../store-redux/comment-replier/actions";
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";

const Comments = () => {
  const params = useParams()
  const dispatch = useDispatch()

  useInit(() => {
    dispatch(commentsActions.load(params.id))
    dispatch(commentReplierActions.setArticle(params.id))
  }, [params.id])

  const select = useSelector(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waitingComments: state.comments.waiting,
    replierActive: state.commentReplier.active
  }), shallowequal)

  const selectStore = useSelectorStore(state => ({
    user: state.session.user._id
  }))

  const listData = useMemo(() => ([
    ...listToTree(select.comments, '_id', 'comments')
  ]), [select.comments])

  const callbacks = {
    setReplierComment: useCallback(id => dispatch(commentReplierActions.setComment(id)), [])
  }

  return (
    <>
      <Spinner active={select.waitingComments}>
        <CommentsList list={listData} count={select.count}
                      nest={0} user={selectStore.user}
                      replierActive={select.replierActive} setReplierComment={callbacks.setReplierComment} />
      </Spinner>
      {select.replierActive === params.id && <CommentReplier parent={'article'} />}
    </>
  );
};

export default React.memo(Comments);
