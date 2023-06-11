import {memo, useCallback, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSelector from '../../hooks/use-selector';
import CommentsForm from '../../components/comments-form';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import Cancel from '../../components/cancel-button';
import PropTypes from 'prop-types';

function CommentsFormContainer({isReply = false, id = false, onCancel}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [formData, setFormData] = useState({
    id: id ? id : params.id,
    value: ''
  })

  const callbacks = {
    onChange: useCallback((value, name) => {
      setFormData(prevData => ({...prevData, [name]: value}));
    }, [formData]),

    onCancelReply: useCallback((e) => {
      e.preventDefault();

      setFormData(prevData => ({...prevData, value: ''}))

      onCancel(e);
    }, []),

    onLoginPage: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [navigate]),

    onSubmit: useCallback((e) => {
      e.preventDefault();

      // Не получается удалить u3164, попробовал разные способы
      // Такая же проверка есть в comments-form
      if (formData.value.trim().replace(/\s/g,'').length == 0) return;

      isReply 
      ? dispatch(commentsActions.postComment(formData.id, formData.value, "comment")) 
      : dispatch(commentsActions.postComment(formData.id, formData.value, "article"));

      setFormData(prevData => ({...prevData, value: ''}))

      if (isReply) onCancel(e);
    
    }, [formData]),
  }

  const selector = useSelector(state => ({
    isAuth: state.session.exists
  }))

  return (
    <>
      {selector.isAuth
      ? <CommentsForm onCancel={callbacks.onCancelReply} isReply={isReply} value={formData.value} onChange={callbacks.onChange} onSubmit={callbacks.onSubmit}/>
      : <Cancel onLogin={callbacks.onLoginPage} onCancel={callbacks.onCancelReply} isReply={isReply} />}
    </>
  )
}

CommentsFormContainer.propTypes = {
  isReply: PropTypes.bool,
  id: PropTypes.string,
  onCancel: PropTypes.func
}

CommentsFormContainer.preventDefault = {
  isReply: false, 
  id: false, 
  onCancel: () => {}
}

export default memo(CommentsFormContainer)