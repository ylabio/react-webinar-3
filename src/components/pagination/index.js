import { memo } from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../store/use-selector';
import List from '../list';
import './style.css';

function Pagination(props) {
  const { renderPage = () => {}, renderLimit = () => {} } = props;

  const select = useSelector(state => ({
    allPages: state.catalog.allPages,
    allLimits: state.catalog.allLimits,
  }));
  
  return (
    <div className="Pagination">
      <List list={select.allLimits} renderItem={renderLimit} pagination={true}/>
      <List list={select.allPages} renderItem={renderPage} pagination={true}/>
    </div>
  );
}

List.propTypes = {
  renderPage: PropTypes.func,
  renderSkip: PropTypes.func,
};

export default memo(Pagination);