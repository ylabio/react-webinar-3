import React, {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import commentActions from '../../store-redux/comment/actions';
import shallowequal from "shallowequal";
import CommentLayout from "../../components/comment-layout";
import CommentForm from "../../components/comment-form";
import CommentItem from "../../components/comment-item";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import {useParams} from "react-router-dom";
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import AuthQuest from "../../components/auth-quest";
import useServices from "../../hooks/use-services";

function CommentSection() {

  const dispatch = useDispatch()
  const params = useParams()

  const [formSelect, setFormSelect] = useState(null)

  const select = useSelector(state => ({
    comments: state.comment.list,
    count: state.comment.count,
  }), shallowequal);


  const isAuth = useServices().store.state.session.exists

  const callbacks = {
    openForm: (id) => setFormSelect(id),
    closeForm: () => setFormSelect(null),
    addComment: useCallback((id, type, text) =>
      dispatch(commentActions.add(id, type, text)), [select.comments]),
  }

  const options = {
    comments: treeToList(listToTree(select.comments), (item, level) => (
      {...item, level: level > 10 ? 10 : level - 1}
    )).slice(1)
  }

  const renders = {
    comments: options.comments.map((item) => (
      <CommentItem
        key={item._id}
        comment={item}
        isActiveForm={formSelect === item._id}
        openForm={callbacks.openForm}
        form={
        <CommentForm
          id={item._id}
          type='comment'
          closeForm={callbacks.closeForm}
          onSubmit={callbacks.addComment}
          isAuth={isAuth}
          noSession={<AuthQuest link={'/login'} isTypeComment/>}
        />}
      />
    ))
  }

  return (
    <CommentLayout title={`Комментарии (${select.count})`}>

      {renders.comments}
      {!formSelect &&
        <CommentForm
          id={params.id}
          type='article'
          onSubmit={callbacks.addComment}
          isAuth={isAuth}
          noSession={<AuthQuest link={'/login'} isTypeComment={false}/>}
        />}
    </CommentLayout>
  )
}

export default React.memo(CommentSection);