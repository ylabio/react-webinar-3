import { memo, useCallback } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LanguageSelectButton({lang, active, onClick}) {

  const cn = bem('LanguageSelectButton');
  
  return (
    <div
      className={active ? cn('active') : cn()}
      onClick={onClick}
    >
      {lang}
    </div>
  );
}

LanguageSelectButton.propTypes = {

};

LanguageSelectButton.defaultProps = {

}

export default memo(LanguageSelectButton);