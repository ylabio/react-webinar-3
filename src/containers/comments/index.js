import { memo, useCallback, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import { useLocation, useParams } from 'react-router-dom';
import ItemComment from '../../components/item-comment';
import CommentsContainer from '../../components/comments-container';
import commentsActions from '../../store-redux/comments/action';
import useSelector from '../../hooks/use-selector';
import { useDispatch, useSelector as UseSelectRedux } from 'react-redux';
import useInit from '../../hooks/use-init';
import shallowEqual from 'shallowequal';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import Spinner from '../../components/spinner';
import CommentsForm from '../../components/comments-form';
import PromptForComments from '../../components/prompt-for-comments';
import formatDate from '../../utils/format-date';

function Comments({}) {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const back = location ? location?.pathname : '/';
  const [newComment, setNewComment] = useState({
    parent: {
      _id: '',
      _type: '',
    },
    text: '',
  });
  const [activeReplyId, setActiveReplyId] = useState(null);

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const selectRedux = UseSelectRedux(
    state => ({
      commentsList: state.comments.data,
      waiting: state.comments.waiting,
      success: state.comments.success,
      article: state.article.data,
    }),
    shallowEqual,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const parent = useMemo(
    () => ({
      _id: activeReplyId || params.id,
      _type: activeReplyId ? 'comment' : selectRedux.article._type,
    }),
    [activeReplyId, params.id, selectRedux.article._type],
  );

  const callbacks = {
    onChange: useCallback(
      e => {
        setNewComment({
          parent,
          text: e.target.value,
        });
      },
      [setNewComment, activeReplyId],
    ),

    onSubmit: useCallback(
      async e => {
        e.preventDefault();
        if (newComment.text) {
          await dispatch(commentsActions.create(newComment));
          dispatch(commentsActions.load(params.id));
          setNewComment({
            parent,
            text: '',
          });
          setActiveReplyId(null);
        }
      },
      [newComment],
    ),
    onCancel: useCallback(e => setActiveReplyId(null), [setActiveReplyId]),
  };
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(listToTree(selectRedux.commentsList), (item, level) => ({
          id: item._id,
          padding: 40 * level,
          author: item.author?.profile.name,
          date: item.dateCreate,
          text: item.text,
        })),
      ],
      [selectRedux.commentsList],
    ),
  };

  return (
    <CommentsContainer title={t('comments.header')} count={options.comments.length}>
      <Spinner active={selectRedux.waiting}>
        {options.comments.map(comment => (
          <div key={comment.id} style={{ paddingLeft: comment.padding }}>
            <ItemComment
              author={comment.author}
              date={formatDate(comment.date)}
              text={comment.text}
              titleBtn={t('comments.answer')}
              onClick={e => setActiveReplyId(comment.id)}
            />

            {select.exists && activeReplyId === comment.id && (
              <CommentsForm
                onSubmit={callbacks.onSubmit}
                submitTitle={t('comments.send')}
                title={t('comments.answer-title')}
                cancelTitle={t('comments.cancel')}
                error={t('comments.error')}
                style="small"
                option="cancel"
                onClick={callbacks.onCancel}
                value={newComment ? newComment.text : newComment}
                onChange={callbacks.onChange}
                success={selectRedux.success}
              />
            )}
            {!select.exists && activeReplyId === comment.id && (
              <PromptForComments
                back={back}
                subLink={t('comments.singIn')}
                subDesc={t('comments.singIn-desc')}
              />
            )}
          </div>
        ))}
      </Spinner>
      {!select.exists && !activeReplyId && (
        <PromptForComments
          back={back}
          subLink={t('comments.singIn')}
          subDesc={t('comments.singIn-desc')}
        />
      )}
      {select.exists && !activeReplyId && (
        <CommentsForm
          onSubmit={callbacks.onSubmit}
          submitTitle={t('comments.send')}
          title={t('comments.title')}
          error={t('comments.error')}
          style="small"
          value={newComment.text}
          onChange={callbacks.onChange}
          success={selectRedux.success}
        />
      )}
    </CommentsContainer>
  );
}

// Comments.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number,
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func,
// };

export default memo(Comments);
