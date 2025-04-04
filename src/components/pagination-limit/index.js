import PropTypes from 'prop-types';
import { memo } from 'react';
import { useLanguage } from '../../i18n';

import './style.css';

const PaginationLimit = ({ onChange = () => {}, limit = 0 }) => {
  const { translate } = useLanguage();

  const handleChange = event => {
    const value = +event.target.value;
    onChange(value);
  };

  return (
    <div className={'PaginationLimit'}>
      <label htmlFor="PaginationLimit-select">{translate('limitLabel')}:</label>
      <select id="PaginationLimit-select" value={limit} onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

PaginationLimit.propTypes = {
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default memo(PaginationLimit);
