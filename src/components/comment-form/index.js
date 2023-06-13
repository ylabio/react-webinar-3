import './style.css';

import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import Field from '../field';
import useTranslate from '../../hooks/use-translate';

function CommentForm(props) {
  const { t } = useTranslate();
  const cn = bem('CommentForm');
  const ref = useRef();
  const callbacks = {
    onSubmit: (evt) => {
      evt.preventDefault();
      props.onSubmit();
    },
  };

  useEffect(() => {
    if (props.shouldFocus) {
      ref.current.focus();
    }
    return () => {
      props.onUnmount();
    };
  }, []);

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{props.title}</h3>
      <form onSubmit={callbacks.onSubmit}>
        <Field margin={'small'} error={props.error ? t('comment.error') : null}>
          <textarea
            ref={ref}
            className={cn('text')}
            value={props.newComment}
            onChange={props.onChange}
          ></textarea>
        </Field>
        <div className={cn('controls')}>
          <button type="submit" disabled={!props.newComment.length}>
            {t('comment.button.submit')}
          </button>
          {props.render()}
        </div>
      </form>
    </div>
  );
}
CommentForm.propTypes = {
  title: PropTypes.string,
  render: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onUnmount: PropTypes.func,
  newComment: PropTypes.string,
  shouldFocus: PropTypes.bool,
  error: PropTypes.string,
};

CommentForm.defaultProps = {
  title: 'Написать комментарий',
  render: () => null,
  onUnmount: () => {},
  error: null,
};
export default CommentForm;
