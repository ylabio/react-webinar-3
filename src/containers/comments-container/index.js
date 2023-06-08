import React, { useCallback, useEffect } from 'react'
import Comment from '../../components/comment'
import CommentsLayout from '../../components/comments-layout'
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import shallowequal from "shallowequal";
import Spinner from '../../components/spinner';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function Comments() {
  const dispatch = useDispatch();

  const params = useParams();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    commentsData: state.comments.data,
    isLoading: state.comments.waiting
  }), shallowequal); 

  const callbacks = {
    renderComments: useCallback(() => {
      if (select.commentsData?.comments?.items) {
        return treeToList(listToTree(select.commentsData.comments.items), (item, level) => {
          return <Comment level={level} key={`${item._id}${level}`} text={item.text} date={item.dateCreate} />
      })
      }
    }, [select])
  }

  return (
    <>
      <Spinner active={select.isLoading}>
        <CommentsLayout quantity={select.commentsData?.length}>
          {callbacks.renderComments()}
        </CommentsLayout>
      </Spinner>
    </>
  )
}

export default Comments