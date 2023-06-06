import { memo } from "react";
import PropTypes from 'prop-types';
import CategoryItem from "../category-item";

function SelectCategory(props) {
    const onSelect = (e) => {
        props.onChange(e.target.value);
    };

    return (
        <select className="Select" value={props.value} onChange={onSelect}>
            {props.options.map(item => {
                return <CategoryItem item={item} key={item._id} />
            })}
        </select>
    )
}

SelectCategory.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
    })).isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func
};

SelectCategory.defaultProps = {
    onChange: () => { }
}

export default memo(SelectCategory);