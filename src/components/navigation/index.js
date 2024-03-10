import { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import BreadCrumbs from "../bread-crumbs";
import BasketTool from '../basket-tool'
import './style.css';

function Navigation({ lang, onOpen, amount, sum }) {
  const cn = bem('Navigation');

  const language = useMemo(() => {
    return {
      title: lang === 'ru' ? 'Главная' : 'Main'
    }
  }, [lang]);

  return (
    <div className={cn()}>
      <BreadCrumbs title={language.title} link='/' />
      <BasketTool language={lang} onOpen={onOpen} amount={amount}
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
