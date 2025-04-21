import React, { useMemo } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ItemComment from '../../components/comment-item';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { useSelector as useSelectorRedux } from 'react-redux';
import { useStore as useStoreRedux } from 'react-redux';
import { useDispatch } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comment/actions';
import FormComment from '../../components/comment-form';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import CommentLayout from '../../components/comment-layout';
import CommentsList from '../../components/comment-list';

function Comments() {
  const { t } = useTranslate();
  const store = useStoreRedux();
  const dispatch = useDispatch();
  const params = useParams();

  const select = useSelector(state => ({
    exists: state.session.exists,
    name: state.session.user.profile?.name,
  }));

  const selectRedux = useSelectorRedux(
    state => ({
      count: state.comment.count,
      comments: state.comment.data,
      index: state.comment.index,
      formCommentIsActive: state.comment.formCommentIsActive,
      formAnswerIsActive: state.comment.formAnswerIsActive,
      currentCommentId: state.comment.currentCommentId,
    }),
    shallowequal,
  );

  const callbacks = {
    // Установка идентификатора для ответа на комментарий
    setIdActiveAnswer: useCallback(
      id => {
        dispatch(commentsActions.setIdActiveAnswer(id));
      },
      [store],
    ),
    sendComment: useCallback(
      (comment, name = select.name) => {
        dispatch(commentsActions.send({ ...comment }, name));
      },
      [store],
    ),
    setFormAnswerIsActive: useCallback(
      id => {
        dispatch(commentsActions.setFormAnswerIsActive(id));
      },
      [store],
    ),
    setFormCommentIsActive: useCallback(() => {
      dispatch(commentsActions.setFormCommentIsActive());
    }),
    addForm: useCallback(
      (id, level, comments) => {
        dispatch(commentsActions.addForm(id, level, comments));
      },
      [store],
    ),
  };

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(listToTree(selectRedux.comments), (item, level) => ({
          name: item.author?.profile?.name,
          datetime: item.dateCreate,
          value: item._id,
          text: item.text,
          level: level,
          mode: 'comment',
        })),
      ],
      [selectRedux.comments],
    ),
  };

  return (
    <CommentLayout count={selectRedux.count} title={t('comment.title')}>
      <CommentsList>
        {options.comments.map(
          (item, index) =>
            item.value && (
              <ItemComment
                comments={options.comments}
                id={item.value}
                name={item.name}
                text={item.text}
                key={item.value}
                datetime={item.datetime}
                level={item.level}
                answer={t('comment.btn.answer')}
                index1={selectRedux.index}
                index2={index}
                exists={select.exists}
                formAnswerIsActive={selectRedux.formAnswerIsActive}
                setFormAnswerIsActive={callbacks.setFormAnswerIsActive}
                setFormCommentIsActive={callbacks.setFormCommentIsActive}
                addForm={callbacks.addForm}
                sendComment={callbacks.sendComment}
                currentCommentId={selectRedux.currentCommentId}
                nameFromSession={select.name}
                t={t}
              />
            ),
        )}
      </CommentsList>
      {selectRedux.formCommentIsActive && (
        <FormComment
          mode="comment"
          title={t('comment.newComment')}
          id={params.id}
          sendComment={callbacks.sendComment}
          type="article"
          exists={select.exists}
          t={t}
        />
      )}
    </CommentLayout>
  );
}

export default React.memo(Comments);
