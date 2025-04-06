import PropTypes from 'prop-types';
import {memo} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {useDictionary} from "../../app/translations/useDictionary";

const PageSize = ({ size, setSize, currentPage }) => {
  const cn = bem('PageSize');
  const options = [5, 10, 20];
  const { t } = useDictionary();

  return (
    <div className={cn()}>
      <p className={cn('title')}>{t('showPer')}:</p>

      {options.map((option) => (
        <label key={option} className={cn('label')}>
          <input
            className={cn('input')}
            type="radio"
            name="perPage"
            value={option}
            checked={size === option}
            onChange={() => setSize({newLimit: option, oldLimit: size, oldPage:currentPage})}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

PageSize.propTypes = {
  size: PropTypes.number.isRequired,
  setSize: PropTypes.func.isRequired,
};

export default memo(PageSize);
