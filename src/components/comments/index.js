import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link, useNavigate} from 'react-router-dom';
import './style.css';
//import useSelector from '../../hooks/use-selector';
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import useInit from '../../hooks/use-init';
import commentsActions from '../../store-redux/comments/actions';

function Comments({id}) {
  const cn = bem('Comments');

  // const select = useSelector(state => ({
  //   exists: state.session.exists,
  // }));

  const select = useSelector(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
    loading: false,
  }), shallowequal);

  const dispatch = useDispatch();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(commentsActions.load(id));
  }, []);

  debugger
  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии (0)</div>

      {select.exists ? <div>asdads</div>
              : <div>
                  <Link to={'/login'} className={cn('link')}>Войдите</Link>
                  <span>,чтобы иметь возможность комментировать</span>
                </div>
      }
    </div>
  )
}

Comments.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string,
  })),
  exists: PropTypes.bool,
  //onNavigate: PropTypes.func
}

Comments.defaultProps = {
  //exists: [],
  //onNavigate: () => {
  //}
}

export default memo(Comments);
