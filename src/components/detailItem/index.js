import {memo} from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";



function DetailItem(props) {
 

  const callbacks = {
    onAdd: () => props.addToBasket(props.result)
  }

  return (
    <div >
      

      <button  onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  )
}

DetailItem.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  category: PropTypes.string,
  year: PropTypes.number,
  price: PropTypes.number,
  langData: PropTypes.object,
  onAdd: PropTypes.func,
};

DetailItem.defaultProps = {
  onAdd: () => {},
}

export default memo(DetailItem);