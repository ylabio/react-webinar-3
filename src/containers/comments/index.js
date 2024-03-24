import { memo } from "react";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import CommentsLayout from "../../components/comments-layout";
import shallowEqual from "shallowequal";
import commentsActions from '../../store-redux/comments/actions'
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../components/comment";
import { useEffect } from "react";
import { useMemo } from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import { useState } from "react";
import { useCallback } from "react";


function Comments({ id }) {
  const store = useStore();
  const dispatch = useDispatch();
  const [answerTo, setAnswerTo] = useState({
    _id: id,
    _type: 'article'
  });

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  const select = useSelector(state => ({
    comments: state.comments.list,
    count: state.comments.count,
    waiting: state.comments.waiting,
  }), shallowEqual);

  const comments = useMemo(() =>
    treeToList(listToTree(select.comments), (item, level) => (
      level > 0 ? <Comment key={item._id} item={item} level={level - 1} /> : ''
    )), [select.comments]);

    const callbacks = {
      onSend: useCallback(),
      onAnswer: useCallback((userId) => setAnswerTo({_id: userId, _type: 'comment'})),
      onCancel: useCallback(() => setAnswerTo({_id: id, _type: 'article'}))
    };

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout count={select.count}>
        {comments}
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments);