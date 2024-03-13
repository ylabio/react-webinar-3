import { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import BreadCrumbs from "../bread-crumbs";
import BasketTool from '../basket-tool'
import './style.css';
import ruTranslations from '../../translations/ru.json';
import enTranslations from '../../translations/en.json';


function Navigation({ lang, onOpen, amount, sum }) {
  const cn = bem('Navigation');

  const language = lang === 'ru' ? ruTranslations : enTranslations;

  return (
    <div className={cn()}>
      <BreadCrumbs title={language.main} link='/' />
      <BasketTool lang={lang} onOpen={onOpen} amount={amount}
        sum={sum} />
    </div>
  );
}

Navigation.propTypes = {
  amount: PropTypes.number,
  sum: PropTypes.number,
  onOpen: PropTypes.func,
  lang: PropTypes.string
};

Navigation.defaultProps = {
  onOpen: () => { },
  lang: 'ru'
}

export default memo(Navigation);
