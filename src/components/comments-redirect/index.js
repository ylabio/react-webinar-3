import { memo, useCallback, useEffect, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

function CommentsRedirect(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const linkRef = useRef(null);

  const callbacks = {
    onRedirect: useCallback(() => {
      navigate(props.redirect, { state: { back: location.pathname } });
    }),
  };

  useEffect(() => {
    if (props.type === 'reply') {
      linkRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, []);

  const cn = bem('CommentsRedirect');
  return (
    <div className={cn()}>
      <a className={cn('link')} onClick={callbacks.onRedirect} ref={linkRef}>
        {props.linkText}
      </a>
      , {props.text}.{' '}
      {props.type === 'reply' && (
        <a className={cn('cancel')} onClick={props.onCancel}>
          {props.labelCancel}
        </a>
      )}
    </div>
  );
}

CommentsRedirect.propTypes = {
  linkText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
  labelCancel: PropTypes.string,
  type: PropTypes.string,
  onCancel: PropTypes.func,
};

CommentsRedirect.defaultProps = {
  type: 'article',
  labelCancel: '',
  onCancel: () => {},
};

export default memo(CommentsRedirect);
