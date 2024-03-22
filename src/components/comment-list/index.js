import {memo} from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';

function CommentList({id}) {

    const store = useStore();

    const dispatch = useDispatch();
    // Параметры из пути /articles/:id
  
  
    useInit(() => {
      //store.actions.article.load(params.id);
      dispatch(commentsActions.load(id));
  
    }, [id]);
  
    const select = useSelector(state => ({
      comments: state.comments?.list,
      waiting: state.comments?.comWaiting,
    })); 

  return (
    <>
    comments
    </>
  )
}

export default memo(CommentList);