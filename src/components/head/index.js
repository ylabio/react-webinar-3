import { memo } from 'react';
import { useAppContext } from '../../app-context';
import { STRINGS } from '../../const';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function Head({ title }) {
  const { language, onSetLanguage } = useAppContext();
  
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <Button
          style="primary"
          onClick={onSetLanguage}
          title={STRINGS.SWITCH_LANGUAGE[language]}
        />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
