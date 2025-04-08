import PropTypes from 'prop-types';
import {memo} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {OPTIONS_LIMIT} from "../../constants";

const PageSize = ({ size, setSize, currentPage, label }) => {
  const cn = bem('PageSize');
  const options = OPTIONS_LIMIT;

  return (
    <div className={cn()}>
      <p className={cn('title')}>{label}:</p>

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
  currentPage: PropTypes.number.isRequired,
};

export default memo(PageSize);
