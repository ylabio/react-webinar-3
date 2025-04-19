import { memo, useMemo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import Comment from '../../components/comment';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import commentsFormat from '../../utils/comments-format';
import shallowequal from 'shallowequal';
import CommentInput from '../../components/comment-input';
import Form from '../../components/form';
import CommentsLayout from '../../components/comments-layout';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';
import InputWrapper from '../input-wrapper';

function CommentList() {

  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const select = useSelectorRedux(
    state => ({
      comments: state.comments.items,
      count: state.comments.count,
      waitingComments: state.comments.waiting,
      article: state.article,
      activeCommentId: state.comments.activeCommentId,
    }),
    shallowequal,
  );

  const callbacks = {
    // Установка айди активного комментария
    setActiveComment: useCallback(id => dispatch(commentsActions.setActiveComment(id)), [select.activeCommentId]),
    //Сброс активного комментария
    resetActiveComment: useCallback(() => {
      dispatch(commentsActions.resetActiveComment());
      setText('');
    }, [select.activeCommentId]),

    // Колбэк на ввод в элементах формы
    onChange: useCallback((newText) => {
      setText(newText);
    }, []),

    // Отправка формы для создания комментария
    onSubmit: useCallback(
      (e, id, type) => {
        e.preventDefault();
        dispatch(commentsActions.sendComment(text, id, type));
        setText('');
        if (type === 'comment') {
          dispatch(commentsActions.resetActiveComment());
        }
      },
      [text],
    ),
  };


  const commentList = useMemo(() => {
    return commentsFormat(select.article.data._id, select.comments);
  }, [select.article, select.comments]);

  const { t } = useTranslate();

  return (
    <>
    <CommentsLayout>
      <h2>{t('comments.title')} ({select.count})</h2>
      <Spinner active={select.waitingComments}>
        {commentList.map((item) => {
          const padding = item.level * 40;
          return (
            <div key={item._id} style={{ paddingLeft: `${padding}px`}}>
              <Comment item={item} onClick={callbacks.setActiveComment} buttonTitle={t('comments.answer')} />
                {select.activeCommentId === item._id &&
                  <InputWrapper>
                    <Form title={t('comments.newAnswer')} submitTitle={t('comments.submit')} onCancel={callbacks.resetActiveComment} onSubmit={(e) => callbacks.onSubmit(e, item._id, 'comment')} cancelTitle={t('comments.cancel')}>
                    <CommentInput onChange={callbacks.onChange} value={text} padding={padding}/>
                    </Form>
                  </InputWrapper>
                }
            </div>
          )
        })}
      </Spinner>
    </CommentsLayout>
      {!select.activeCommentId &&
        <InputWrapper>
          <Form title={t('comments.newComment')} submitTitle={t('comments.submit')} onSubmit={(e) => callbacks.onSubmit(e, select.article.data._id)} >
            <CommentInput onChange={callbacks.onChange} value={text}/>
          </Form>
        </InputWrapper>
      }
    </>
  );
}

export default memo(CommentList);
