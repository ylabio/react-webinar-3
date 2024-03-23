import { memo } from "react";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import CommentsLayout from "../../components/comments-layout";
import shallowEqual from "shallowequal";
import commentsActions from '../../store-redux/comments/actions'
import { useDispatch, useSelector } from "react-redux";


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

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout count={select.count}>

      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments);