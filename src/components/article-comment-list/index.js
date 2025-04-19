import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import Button from '../button';
import NewComment from '../new-comment';
import Comment from '../comment';

import { cn as bem } from '@bem-react/classname';
import './style.css';

function ArticleCommentList(props) {
  const cn = bem('ArticleCommentList');
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <section className={cn()}>
      <h2 className={cn('caption')}>Комментарии (0)</h2>
      <Comment>
        <Comment>
          <Comment>
            <Comment />
          </Comment>
        </Comment>
      </Comment>
      {
        select.exists ?
        <NewComment/> :
        <p className={cn('stranger')}><Button style="text" onClick={callbacks.onSignIn} title={"Войдите"} />, чтобы иметь возможность комментировать</p>
      }
    </section>
  );
}


export default memo(ArticleCommentList);
