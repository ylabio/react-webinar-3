import { memo } from 'react';
import PropTypes from 'prop-types';

function SelectLimit(props) {
  const { limit = 10, limitChange = () => {} } = props;
  return (
    <select value={limit} onChange={event => limitChange(event.target.value)}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );
}
SelectLimit.propTypes = {
  limit: PropTypes.number,
  limitChange: PropTypes.func,
};
export default memo(SelectLimit);
