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


function Comments({id}) {
  const store = useStore();
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  const select = useSelector(state => ({
    comments: state.comments.list,
    count: state.comments.count,
    waiting: state.comments.waiting,
  }), shallowEqual);

  useEffect(() => {
    console.log(select.comments);
  }, [select.comments])

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout count={select.count}>
        <Comment item={select.comments[1]} level='0'/>
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments);