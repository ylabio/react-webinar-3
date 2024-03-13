import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import BasketTool from "../basket-tool"
import { Link } from "react-router-dom";

function Menu({sum, amount, onOpen, texts, locale}){
  const cn = bem('Menu');
  console.log(texts);
  return (
    <div className={cn()}>
      <div className={cn('link-container')}>
        <Link className={cn('link')} to="/page/1">{texts?.main}</Link>
      </div>
      <div className="BasketTool-container">
      <BasketTool onOpen={onOpen} amount={amount}
                  sum={sum} texts={texts} locale={locale}/>
      </div>
    </div>
  );
}

Menu.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  texts: PropTypes.shape({}),
  locale: PropTypes.string
};

Menu.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(Menu);