import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { useEffect, useRef } from 'react';

function ShouldLogin(props) {
  const cn = bem('ShouldLogin');
  const location = useLocation();
  const ref = useRef();
  useEffect(() => {
    if (props.shouldFocus) {
      ref.current.focus();
    }
    return () => {
      props.onUnmount();
    };
  }, []);
  return (
    <div>
      <Link
        ref={ref}
        to={props.to}
        className={cn('link')}
        state={{ back: location.pathname }}
      >
        {props.link}
      </Link>{' '}
      {props.text}
      {props.render(cn('reset'))}
    </div>
  );
}

ShouldLogin.propTypes = {
  to: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  render: PropTypes.func,
  shouldFocus: PropTypes.bool,
  onUnmount: PropTypes.func,
};

ShouldLogin.defaultProps = {
  render: () => null,
  onUnmount: () => {},
};

export default ShouldLogin;
