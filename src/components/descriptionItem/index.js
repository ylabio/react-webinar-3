import {memo} from "react";
import {numberFormat} from "../../utils";
import "./style.css";

function DescriptionItem(props) {
  

  const callbacks = {
    onAdd: () => props.addToBasket(props.result)
  }

  return (
    <div >
       <div className="div_detail">{props.result.description}</div>
          <p className="div_detail"> {props.langData.details.country_txt}
            <span> <b> {props.result.madeIn?.title}</b> </span>
            <span> <b> ({props.result.madeIn?.code}) </b> </span>
          </p>
          <p className="div_detail">{props.langData.details.category_txt} <span ><b>{props.result.category?.title}</b></span></p>
          <p className="div_detail">{props.langData.details.year_txt} <span ><b>{props.result.edition}</b></span></p>
          <div className="div_detail"><b>{props.langData.details.price_txt} {props.result.price} ₽</b></div>
          <button  className="div_detail" onClick={callbacks.onAdd}>
        {props.langData.buttons.onAddTxt}
      </button>
    </div>
  )
}



export default memo(DescriptionItem);