import { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import './style.css';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import useSelector from '../../hooks/use-selector';
import { Link } from 'react-router-dom';

function CommentsWrapper(props) {
  const isLogin = useSelector(state => state.session.exists);
  const [commentIdFormVisible, setCommentIdFormVisible] = useState('');
  const { comments, _id, _type, t } = props;
  const formattedComments = useMemo(() => treeToList(listToTree(comments.items)), [props.comments]);

  const rootComments = useMemo(() => {
    return formattedComments.slice(1).filter(comment => comment.parent._id === _id);
  }, [formattedComments, _id]);

  const cn = bem('CommentsWrapper');
  return (
    <div className={cn()} key={comments.items.length}>
      <span className={cn('header')}>{`${t(`product.comments`)}: (${comments.count})`}</span>
      <div className={cn('container')}>
        {rootComments.map(comment => (
          <CommentItem
            key={comment._id}
            isLogin={isLogin}
            setCommentIdFormVisible={setCommentIdFormVisible}
            commentIdFormVisible={commentIdFormVisible}
            comment={comment}
          />
        ))}
      </div>

      {isLogin ? (
        commentIdFormVisible === '' && (
          <CommentForm _id={_id} _type={_type} setCommentIdFormVisible={setCommentIdFormVisible} />
        )
      ) : (
        <span className="loginToAllowComment">
          <Link to={`/login`}>Войдите</Link>, чтобы иметь возможность комментировать
        </span>
      )}
    </div>
  );
}

CommentsWrapper.propTypes = {
  comments: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
  }),
  _id: PropTypes.string,
  _type: PropTypes.string,
};

export default memo(CommentsWrapper);
