import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Error({message, btnRetryTitle, onRetry}) {

  const cn = bem('Error');

  return (
    <div className={cn()}>
      <div className={cn('message')}>{message}</div>
      <div className={cn('tools')}>
        <button onClick={onRetry}>{btnRetryTitle}</button>
      </div>
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string,
  btnRetryTitle: PropTypes.string,
  onRetry: PropTypes.func,
};

Error.defaultProps = {
  message: 'Error',
  btnRetryTitle: 'Retry',
  onRetry: () => {},
}

export default memo(Error);
