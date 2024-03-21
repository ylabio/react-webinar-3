import {Children, memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FormBody(props) {
  const cn = bem('FormBody');
  const {
    children,
    title = '',
    onSubmit,
    message,
    btnName='',
  } = props;

  return (
    <form onSubmit={onSubmit} className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      <ul className={cn('lists')}>
        {Children.map(children, (child) => (
          <li> {child} </li>
        ))}
      </ul>
      {message && <p className={cn('errorMessage')}>
        {message}
      </p>}
      <button className={cn('btn')} type='submit'>{btnName}</button>
    </form>
  );
}

FormBody.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
  btnName: PropTypes.string.isRequired,
}

FormBody.defaultProps = {
  onSubmit: () => {},
}

export default memo(FormBody);