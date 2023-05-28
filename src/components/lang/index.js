import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import useTranslate from '../../store/use-translate';

function Lang(props) {
  const t = useTranslate();
  const cn = bem('Lang');
  return (
    <div className={cn()}>
      <button
        className={cn('btn', { active: t('getLocale', true) === 'ru-RU' })}
        onClick={() => props.onChangeLang('ru-RU')}
      >
        Ru
      </button>
      <button
        className={cn('btn', { active: t('getLocale', true) === 'en-EN' })}
        onClick={() => props.onChangeLang('en-EN')}
      >
        Eng
      </button>
    </div>
  );
}

Lang.propTypes = {
  onChangeLang: PropTypes.func.isRequired,
};

export default memo(Lang);
