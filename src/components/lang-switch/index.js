import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LangSwitch({defaulCode, codesArr, onClick}) {
  const cn = bem('LangSwitch');
  return (
    <ul className={cn()}>
      {codesArr.map((lang, index) => {
        const classN = lang === defaulCode ? cn('active') : ''
        return <li key={index}>
          <button onClick={() => onClick(lang)} className={classN}>{lang}</button>
        </li>
      })}
    </ul>
  );
}

LangSwitch.propTypes = {
  defaulCode: PropTypes.string.isRequired,
  codesArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
};

export default memo(LangSwitch);
