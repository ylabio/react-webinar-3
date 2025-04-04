import PropTypes from 'prop-types';
import {memo} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const PageSize = ({ size, setSize }) => {
  const cn = bem('PageSize');
  const options = [5, 10, 20];

  return (
    <div className={cn({ radio: true })}>
      <p>Количество записей на странице:</p>

      {options.map((option) => (
        <label key={option} className={cn('label')}>
          <input
            className={cn('input')}
            type="radio"
            name="perPage"
            value={option}
            checked={size === option}
            onChange={() => {setSize(option)}}
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
