import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import Button from '../button';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import {useLocation, useNavigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Comment from '../comment';

function CommentsCard(props) {
  // const { article, onAdd = () => {}, t = text => text } = props;

  const cn = bem('CommentsCard');
  const { t } = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.actions.session.signOut();
    }, []),
  };

  const rootComments = props.comments.filter(
    (comment) => comment.parent._type === "article" && !comment.isDeleted
  );

  return (
    <div className={cn()}>
      <div className={cn('description')}>Комментарии ({props.count})</div>
      <div className={cn('comments')}>
        {rootComments.length > 0 && (
          rootComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              comments={props.comments}
              level={0}
            /> )))
        }
      </div>
      {!select.exists && ( <div className={cn('login')}>
        <p className={cn('label')}><Button className={cn('label')} style="text" onClick={callbacks.onSignIn} title={t('session.signIn')} />, чтобы иметь возможность комментировать</p>
      </div> ) }
    </div>
  );
}

// CommentsCard.propTypes = {
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

export default memo(CommentsCard);
