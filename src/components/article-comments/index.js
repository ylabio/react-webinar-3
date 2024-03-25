import { memo, useState } from "react"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './style.css'
import ArticleComment from "../article-comment";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import ArticleCommentForm from "../article-comment-form";

const ArticleComments = ({
  isLoggedIn, 
  loggedUserId, 
  pathname, 
  comments, 
  commentParent, 
  onAddComment
}) => {
  const [commentForm, setCommentForm] = useState({
    form: 'comment',
    commentIndex: null,
  })
  
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
      <div className="ArticleComments-title">Комментарии ({comments.count})</div>
      {list && list.map((comment, index) => (
        <ArticleComment 
          key={comment._id} 
          index={index}
          comment={comment} 
          loggedUserId={loggedUserId} 
          replyFormOpen={commentForm.commentIndex === index}
          handleCommentForm={callbacks.handleCommentForm}
          isLoggedIn={isLoggedIn} 
          link='/login'   
          pathname={pathname}  
          onAddComment={onAddComment} 
        />
      ))}
      
      {commentForm.form === 'comment' && (
        <ArticleCommentForm 
          title='комментарий'
          isLoggedIn={isLoggedIn} 
          link='/login'   
          pathname={pathname} 
          commentParent={commentParent} 
          onAddComment={onAddComment} 
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

}

export default memo(ArticleComments)