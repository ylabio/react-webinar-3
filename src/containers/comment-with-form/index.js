import { memo, useMemo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import Comment from '../../components/comment';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import commentsFormat from '../../utils/comments-format';
import shallowequal from 'shallowequal';
import CommentInput from '../../components/comment-input';
import Form from '../../components/form';
import commentsActions from '../../store-redux/comments/actions';
import InputWrapper from '../input-wrapper';
import useSelector from '../../hooks/use-selector';
import CommentsLayout from '../../components/comments-layout';


function CommentWithForm(props) {

    const dispatch = useDispatch();

    const [text, setText] = useState('');

    const { t } = useTranslate();
  
    const select = {...useSelectorRedux(
      state => ({
        activeCommentId: state.comments.activeCommentId,
      }),
      shallowequal,
    ), ...useSelector(
      state => ({
        user: state.session.user,
      })
    )};
  
    const callbacks = {
      // Установка айди активного комментария
      setActiveComment: useCallback(
        id => dispatch(commentsActions.setActiveComment(id)),
      [select.activeCommentId]),
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
          if (text.trim().length !== 0) {
            dispatch(commentsActions.sendComment(text, id, type));
            setText('');
            dispatch(commentsActions.resetActiveComment());
          }
        },
        [text],
      ),
    };
  const children = props.item.children;
  const isPaddingLeft = props.level > 0 && props.level <= 10;
  const isFormPadding = props.level <= 10;
  return (
  <CommentsLayout isPaddingLeft={isPaddingLeft} gap="medium">
    <Comment
      item={props.item}
      onClick={callbacks.setActiveComment}
      buttonTitle={t('comments.answer')}
      user={select.user.profile?.name}
    />
    {children?.map((child) => (
      <CommentWithForm
        item={child}
        level={props.level + 1}
        key={child._id}
        text={text}
      />))
    }
    {select.activeCommentId === props.item._id &&
      <div style={{ paddingLeft: '40px'}}>
        <InputWrapper>
          <Form
            title={t('comments.newAnswer')}
            submitTitle={t('comments.submit')}
            onCancel={callbacks.resetActiveComment}
            onSubmit={(e) => callbacks.onSubmit(e, props.item._id, 'comment')}
            cancelTitle={t('comments.cancel')}
            titleType='small'
          >
            <CommentInput
              onChange={callbacks.onChange}
              value={text}
            />
          </Form>
        </InputWrapper>
      </div>
    }
  </CommentsLayout>)

}

export default memo(CommentWithForm);