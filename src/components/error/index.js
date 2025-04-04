import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Error({error}) {
  const cn = bem('Error');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Произошла ошибка загрузки данных!</h2>
      <div className={cn('message')}>{error}</div>
      <span className={cn('what-to-do')}>Обновите страницу.</span>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string,
};

export default memo(Error);
