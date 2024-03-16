import { memo } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

function AuthorizationTool({onLogin, buttonTitle}) {
  const cn = bem('AuthorizationTool');

  return (
    <div className={cn()}>
      <button onClick={onLogin}>{buttonTitle}</button>
    </div>
  );
}

AuthorizationTool.propTypes = {
  onLogin: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string
}

AuthorizationTool.deaultProps = {
  onLogin: () => {
  }
}

export default memo(AuthorizationTool);