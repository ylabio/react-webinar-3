import { memo, use } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import './style.css';

function List({ list, renderItem = () => {} }) {
  const navigate = useNavigate();
  const handleClick = event => {
    if (event.target.closest('li') && event.target.localName !== 'button') {
      navigate(`/article/${event.target.closest('li').dataset.id}`);
    }
  };

  return (
    <ul className="List" onClick={handleClick}>
      {list.map(item => (
        <li key={item._id} data-id={item._id} className="List-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

export default memo(List);
