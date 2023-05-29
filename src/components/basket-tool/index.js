import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {useLanguage} from "../../hooks";

function BasketTool({sum, amount, onOpen}) {
  const {t} = useLanguage()

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{t("In the basket")}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: t("One product"),
            few: t("Few products"),
            many: t("Many products")
          })} / ${numberFormat(sum)} ₽`
          : t("Empty")
        }
      </span>
      <button onClick={onOpen}>{t("Go to")}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
