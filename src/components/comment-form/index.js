import React, { memo, useState } from 'react';
import Form from '../form';
import Input from '../input';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';

function CommentForm({
  title = `Новый комментарий`,
  setCommentIdFormVisible,
  secondButtonTitle = '',
  _id = '',
  _type = '',
}) {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const error = useSelector(state => state.comments.error);

  async function createComment(event, { _type, _id, text }) {
    event.preventDefault();

    if (!inputText.trim()) {
      alert('комментарий не может быть пустым');
      return;
    }

    const res = await dispatch(commentsActions.createComment({ _type, _id, text }));

    if (res) {
      setInputText('')
      setCommentIdFormVisible('');
    }
  }

  return (
    <>
      <Form
        title={title}
        submitTitle={`Отправить`}
        secondButtonTitle={secondButtonTitle}
        secondButtonFunc={setCommentIdFormVisible}
        onSubmit={event => createComment(event, { text: inputText, _id: _id, _type: _type })}
      >
        <Input theme={`commentForm`} onChange={setInputText} />
        {error && <span className="errorMessage">{error}</span>}
      </Form>
    </>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  setCommentIdFormVisible: PropTypes.func,
  secondButtonTitle: PropTypes.string,
  _id: PropTypes.string,
  _type: PropTypes.string,
};

export default memo(CommentForm);
