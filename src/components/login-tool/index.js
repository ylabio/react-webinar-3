import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginTool({login, title}) {
  const cn = bem('LoginTool');
  return (
    <div className={cn()}>
      <button onClick={login}>{title}</button>
    </div>
  );
}

LoginTool.propTypes = {
  login: PropTypes.func.isRequired,
  title: PropTypes.string
};

LoginTool.defaultProps = {
  login: () => {
  }
}

export default memo(LoginTool);
