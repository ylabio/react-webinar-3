import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import commentsActions from '../../store-redux/comments/actions';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import useSelector from '../../hooks/use-selector';
import CommentsContent from '../../components/comments-content';
import listToTree from '../../utils/list-to-tree';

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();
  const { pathname } = useLocation();
  const [activeNodeId, setActiveNodeId] = useState('main');

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.data.items,
      count: state.comments.data.count,
      waiting: state.comments.waiting,
    }),
    shallowequal,
  );

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const callbacks = {
    // Установление id узла, в котором открыта форма добавления комментария
    setNodeId: useCallback(nodeId => {
      setActiveNodeId(nodeId);
    }, []),
    // Добавление комментария и обновление данных
    addComment: useCallback(async (id, text, type) => {
      await dispatch(commentsActions.createComment(id, text, type));
      await dispatch(commentsActions.load(params.id));
      setActiveNodeId('main');
    }, []),
  };

  const commentsTree = useMemo(() => listToTree(selectRedux?.comments || []), [selectRedux.comments]);

  return (
    <CommentsContent
      exists={select.exists}
      waiting={selectRedux.waiting}
      comments={commentsTree}
      activeNodeId={activeNodeId}
      id={params.id}
      addComment={callbacks.addComment}
      setNodeId={callbacks.setNodeId}
      count={selectRedux.count}
      pathname={pathname}
    />
  );
}

export default memo(Comments);
