import {memo, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import './style.css';

function SelectCategory(props) {

  const onSelectCategory = (e) => {
    props.onChangeCategory(e.target.value);
  };
  const select = useRef(null);
  useEffect(() => {
  }, [select]);
  
  return (
    <select ref={select} className="SelectCategory"
            value={props.value} onChange={onSelectCategory}>
      <option key={'category-all'} value={'*'}>{props.all}</option>
      { props.optionsCategory.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))
      }
    </select>
  )
}

SelectCategory.propTypes = {
  optionsCategory: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  })).isRequired,
  value: PropTypes.any,
  onChangeCategory: PropTypes.func,
  all: PropTypes.string,
};

SelectCategory.defaultProps = {
  all: '',
  onChangeCategory: () => {
  }
}

export default memo(SelectCategory);
