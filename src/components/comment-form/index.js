import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Button from '../button';
import useSelector from '../../hooks/use-selector';
import { useSelector as useSelectorRedux } from 'react-redux';
import { useDispatch } from 'react-redux';
import commentActions from '../../store-redux/comment/actions';
import commentFormAction from '../../store-redux/comment-form/actions';
import useTranslate from '../../hooks/use-translate';
import { useCallback } from 'react';


function CommentForm() {
  const cn = bem('CommentForm');
  const [textValue, setTextValue] = useState('');

  const dispatch = useDispatch();
  const params = useParams();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.session.token,
    exists: state.session.exists,
  }));

  const selectPlace = useSelectorRedux(state => state.commentForm.place);
  const selectData = useSelectorRedux(state => state.comment.data)

  const isCommonPlace = selectPlace === 'common';

  const onSignIn = useCallback(() => {
    navigate('/login', { state: { back: location.pathname } });
  }, [location.pathname]);

  const handlePostComment = () => {
    if (textValue.trim().length !== 0) {
      if (isCommonPlace) {
        dispatch(commentActions.post(select.token, textValue, params.id));
        
      } else {
        dispatch(commentActions.reply(select.token, textValue, selectPlace));
      }
    }
    setTextValue('');
  };

  return (
    <div className={cn()} style={{ marginLeft: `${!isCommonPlace ? '40px' : '0'}` }}>
      {select.exists ? (
        <>
          <span className={cn('title')}>
            {isCommonPlace ? t('comment-form.new-comment') : t('comment-form.new-reply')}
          </span>
          <textarea
            className={cn('textarea')}
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
            rows={5}
          ></textarea>
          <div className={cn('buttons')}>
            <Button onClick={handlePostComment} title={t('comment-form.send')} style="primary" />
            {!isCommonPlace && (
              <Button
                title={t('comment-form.cancel')}
                style="outline"
                onClick={() => dispatch(commentFormAction.reset())}
              />
            )}
          </div>
        </>
      ) : (
        <div className={cn('unauthorized')}>
          <button className={cn('link-login')} onClick={onSignIn}>
            {t('comment.login')}
          </button>
          {t('comment.login-able-to-comment')}
        </div>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  children: PropTypes.node,
};

export default memo(CommentForm);
