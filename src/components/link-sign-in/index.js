import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import './style.css';

function LinkSignIn (props) {

  const cn = bem('LinkSignIn');

  const location = useLocation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to={props.link} state={{back: location.pathname}}>{props.signIn}</Link>
      <div className={cn('text')}>{props.textSignIn}{props.punctuation}</div>
    </div>
  );

}

LinkSignIn.propTypes = {
  signIn: PropTypes.string,
  textSignIn: PropTypes.string,
  link: PropTypes.string,
};

LinkSignIn.defaultProps = {
  punctuation: '',
}

export default memo(LinkSignIn);