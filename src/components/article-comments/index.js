import React, { memo, useState, useRef, useEffect } from "react"
import PropTypes from 'prop-types';
import './style.css'
import ArticleComment from "../article-comment";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import ArticleCommentForm from "../article-comment-form";
import ArticleCommentReplyForm from "../article-comment-reply-form";
import { scrollIntoViewWithOffset } from "../../utils/article-comments/helpers";

const ArticleComments = ({
  isLoggedIn, 
  loggedUserId, 
  pathname, 
  comments, 
  commentParent, 
  onAddComment,
  t
}) => {
  const [commentForm, setCommentForm] = useState({
    form: 'comment',
    replyFormBelowCommentId: null,
    parent: {}
  })

  const replyFormRef = useRef(null)
  
  useEffect(() => {
    const replyFormNode = replyFormRef.current

    if(replyFormNode) {
      scrollIntoViewWithOffset(replyFormNode, 50)
    }
  }, [commentForm])
  
  let tree
  let list
  
  if(comments.items) {
    tree = listToTree(comments.items);
    if(!!tree.length) {
      list = treeToList(tree[0].children, (comment, level) => (
        {...comment, level}
      ));
    }
  }
  
  const callbacks = {
    handleCommentForm: (form) => {setCommentForm(form)}
  }
  
  return (
    <div className="ArticleComments">
      <div className="ArticleComments-title">
        {t('article.commentaries-title')} {!!comments.count && `(${comments.count})`}
      </div>
      {list && list.map((comment) => (
        <React.Fragment key={comment._id}>
          <ArticleComment
            comment={comment}
            loggedUserId={loggedUserId}
            handleCommentForm={callbacks.handleCommentForm}
            t={t}
          />
          {(comment._id === commentForm.replyFormBelowCommentId) && (
            <ArticleCommentReplyForm 
              ref={replyFormRef}
              parent={commentForm.parent}
              pathname={pathname}
              isLoggedIn={isLoggedIn}
              link='/login'
              handleCommentForm={callbacks.handleCommentForm} 
              onAddComment={onAddComment}
              t={t}
            />
          )}
        </React.Fragment>
      ))}
      
      {commentForm.form === 'comment' && (
        <ArticleCommentForm 
          isLoggedIn={isLoggedIn} 
          link='/login'   
          pathname={pathname} 
          commentParent={commentParent} 
          onAddComment={onAddComment} 
          t={t}
        />
      )}
    </div>
  )
}

ArticleComments.propTypes = {
  isLoggedIn: PropTypes.bool,
  pathname: PropTypes.string,
  comments: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })),
    count: PropTypes.number,
  }),
  t: PropTypes.func
}

ArticleComments.defaultProps = {
  t: (text) => text
}

export default memo(ArticleComments)