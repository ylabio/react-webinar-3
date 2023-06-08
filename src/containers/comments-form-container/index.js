import {memo, useCallback, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import useSelector from '../../hooks/use-selector';
import CommentsForm from '../../components/comments-form';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import Cancel from '../../components/cancel-button';
import PropTypes from 'prop-types';

function CommentsFormContainer({isReply = false, id = false, onCancel}) {

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

    onCancel: useCallback((e) => {
      e.preventDefault();

      setFormData(prevData => ({...prevData, value: ''}))
      onCancel()
    }, []),

    onSubmit: useCallback((e) => {
      e.preventDefault();

      isReply 
      ? dispatch(commentsActions.postComment(formData.id, formData.value, "comment")) 
      : dispatch(commentsActions.postComment(formData.id, formData.value, "article"));

      setFormData(prevData => ({...prevData, value: ''}))

      callbacks.onCancel(e);

      dispatch(commentsActions.load(params.id));
    }, [formData]),
  }

  const selector = useSelector(state => ({
    isAuth: state.session.exists
  }))

  return (
    <>
      {selector.isAuth
      ? <CommentsForm onCancel={callbacks.onCancel} isReply={isReply} value={formData.value} onChange={callbacks.onChange} onSubmit={callbacks.onSubmit}/>
      : <Cancel url={'/login'} onCancel={callbacks.onCancel} isReply={isReply} />}
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