import { memo } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AuthorizationTool({onClick, buttonTitle}) {
  const cn = bem('AuthorizationTool');

  return (
    <div className={cn()}>
      <button onClick={onClick}>{buttonTitle}</button>
    </div>
  );
}

AuthorizationTool.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string
}

AuthorizationTool.deaultProps = {
  onClick: () => {
  }
}

export default memo(AuthorizationTool);