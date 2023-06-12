import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import dateFormat from "../../utils/format-date"
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ data, onOpen, username, t }) {

  const cn = bem('Comment');

  const callbacks = {
    commentBtnHandler: useCallback(() => {
      onOpen(data._id);
    }, []),
  
  }

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <p className={data.author.profile.name === username ? cn('user-name', { login: true }) : cn('user-name')} >
          {data.author.profile.name}</p>
        <p className={cn('date')} >{dateFormat(data.dateCreate)}</p>
      </div>
      <div className={cn('content')}>
        <p>{data.text}</p>
      </div>
      <button className={cn('button')} onClick={callbacks.commentBtnHandler}>{t('comments.answer')}</button>
    </div>
  );
}

Comment.propTypes = {
  date: PropTypes.object,
  onOpen: PropTypes.func,
  closeAnswerForm: PropTypes.func,
  answerComment: PropTypes.func,
  isOpenAnswer: PropTypes.string,
  exists: PropTypes.bool,
  parentId: PropTypes.string,
  username: PropTypes.string,
  t: PropTypes.func,
};

Comment.defaultProps = {
}

export default memo(Comment);
