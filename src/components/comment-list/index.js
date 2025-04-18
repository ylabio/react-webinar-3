import React, {memo, useCallback, useMemo, useState} from 'react';
import CommentItem from '../comment-item';
import buildCommentTree from '../../utils/buildCommentTree';
import Textarea from '../textarea';
import './style.css';
import Button from "../button";
import {useLocation, useNavigate} from "react-router-dom";

const CommentList = ({
  onPost = () => {},
  isAuth = false,
  commentTree = [],
  commentCount = 0,
  postCommentText = '',
  setPostCommentText = () => {},
  activeReplyId = null,
  setActiveReplyId = () => {},
  sessionUserId = null,
  goToLogin = () => {},
}) => {



  return (
    <>
      <div className="comList-title">Комментарии ({commentCount})</div>
      <div>
        {commentTree.map(comment => (
          <CommentItem
            isAuth={isAuth}
            key={comment._id}
            comment={comment}
            activeReplyId={activeReplyId}
            setActiveReplyId={setActiveReplyId}
            postCommentText={postCommentText}
            setPostCommentText={setPostCommentText}
            onPost={onPost}
            sessionUserId={sessionUserId}
            goToLogin={goToLogin}
          />
        ))}
      </div>
      {!activeReplyId && isAuth &&
        <Textarea
          onPost={onPost}
          title="Новый комментарий"
          parentType="article"
          postCommentText={postCommentText}
          setPostCommentText={setPostCommentText}
        />
      }
      {!activeReplyId && !isAuth &&
        <div className={'com-item-unAuth'}>
          <Button style={'text'} title={'Войдите'} onClick={goToLogin} />, чтобы иметь
          возможность комментировать
        </div>
      }
    </>
  );
};

export default memo(CommentList);
