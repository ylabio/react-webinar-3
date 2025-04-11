import { memo } from 'react';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginButton({ title, children }) {
  const { t } = useTranslate();

  return (
    <div className="LoginButton">
      <div className="LoginButton-container">
        <span className="LoginButton-user-name">User 1</span>
        <button className="LoginButton-button" type='button'>{t('head.entry')}</button>
      </div>
    </div>
  );
}

LoginButton.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(LoginButton);
