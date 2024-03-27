import {memo, useCallback, useEffect, useState} from 'react';
import useSelector from '../../hooks/use-selector';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import ItemComment from '../../components/item-comment';
import listToTree from '../../utils/list-to-tree';
import CommentForm from '../../components/comment-form';
import Comments from '../../components/comments';
import commentsActions from '../../store-redux/comments/actions';

function CommentsList(props) {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {lang, t} = useTranslate(state => ({lang: state.lang}));

  const [parent, setParent] = useState(props.parent);
  const [text, setText] = useState('');

  const session = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user
  }));

  const select = useSelectorRedux(state => ({
    items: state.comments.items,
    count: state.comments.count,
    message: state.comments.message,
    waiting: state.comments.waiting,
    sending: state.comments.sending
  }), shallowequal);

  const cancelAnswer = () => setParent(props.parent);

  useEffect(
    () => {
      if (parent._id !== props.parent._id) {
        document.getElementById('commentForm').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }
    },
    [parent]
  );

  useEffect(
    () => {
      if (!select.sending && !select.message) {
        cancelAnswer();
        setText('');
      }
      if (!select.sending && select.message) {
        alert(select.message);
      }
    },
    [select.sending, select.message]
  );

  const callbacks = {
    send: useCallback(() => dispatch(commentsActions.send(session.user, parent, text))),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname])
  }

  const renders = {
    item: useCallback(
      (item, level, maxLevel, renderItem) => {
        return <>
          <ItemComment
            item={item}
            level={level + 1}
            maxLevel={maxLevel}
            lang={lang}
            isSelf={session.exists && session.user._id === item.author._id}
            labelAnswer={t('comments.answer')}
            onAnswer={setParent}
            renderItem={renderItem}
          />
          { parent._id === item._id &&
              <CommentForm
                title={t('comments.newAnswer')}
                theme='embed'
                autoFocus={true}
                t={t}
                exists={session.exists}
                onCancel={cancelAnswer}
                isCancelable={true}
                text={text}
                setText={setText}
                disabled={select.sending}
                onSubmit={callbacks.send}
                onSignIn={callbacks.onSignIn}/>
          }
        </>
      },
      [lang, parent, text, session.exists]
    ),
  };

  const items = select.items.length > 0 ? listToTree(select.items)[0].children : [];

  return (
    <>
      <Comments
        title={t('comments') + ` (${select.count})`}
        items={items}
        maxLevel={5}
        renderItem={renders.item}/>
      { parent._id === props.parent._id &&
          <CommentForm
            title={t('comments.newComment')}
            t={t}
            exists={session.exists}
            text={text}
            setText={setText}
            disabled={select.sending}
            onSignIn={callbacks.onSignIn}/>
      }
    </>
  );
}

CommentsList.propTypes = {
  parent: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string
  }).isRequired,
  count: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({name: PropTypes.string})
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
  }))
};

CommentsList.defaultProps = {
  count: 0,
  items: []
}

export default memo(CommentsList);