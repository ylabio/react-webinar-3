import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function LoginButton(props) {
  const cn = bem('LoginButton');
  return (
    <button className={cn()} onClick={props.onNavigate}>
      {props.text}
    </button>
  );
}

LoginButton.propTypes = {
  text: PropTypes.string,
  onNavigate: PropTypes.func,
};

LoginButton.defaultProps = {
  text: 'Button',
  onNavigate: () => {},
};

export default memo(LoginButton);
