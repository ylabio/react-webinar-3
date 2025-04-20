import React, { memo, useState } from 'react';
import Form from '../form';
import Input from '../input';
import PropTypes from 'prop-types';

function CommentForm({
  title = `Новый комментарий`,
  setCommentIdFormVisible,
  secondButtonTitle = '',
  _id = '',
  _type = '',
  error = '',
  createComment = () => {},
}) {
   const [inputText, setInputText] = useState('');
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
  error: PropTypes.string,
};

export default memo(CommentForm);
