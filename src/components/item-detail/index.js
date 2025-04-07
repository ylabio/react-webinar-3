import React, {memo} from "react"
import "./style.css"
import Button from '../button/index';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import { messages } from "../../messages";

function ItemDetail({item, onAdd = ()=>{}}){
    const select = useSelector(state => ({
          lang: state.inter.lang,
      }));
    const cn = bem('ItemDetail');
    const price = numberFormat(item.price);
    const date = new Date(item.dateCreate).getFullYear();

    const callbacks = {
        onAdd: e => onAdd(item._id),
      };
    
    const madeInMessage = messages[select.lang].madeIn;
    const categoryMessage = messages[select.lang].category;
    const createdAtMessage = messages[select.lang].createdAt;
    const priceMessage = messages[select.lang].price;
    const buttonMessage = messages[select.lang].addButton;


    return(
        <>
        <div className={cn()}>
            <div>
            <p>{item.description}</p>
            </div>
            <div className={cn("details")}>
            <div className={cn("item")}>
            <p className={cn("label")}>{madeInMessage}:</p>  <span className={cn("value")}>{item.madeIn._type}</span>
            </div>
            <div className={cn("item")}>
            <p className={cn("label")}>{categoryMessage}:</p><span className={cn("value category")}>{item.category._type}</span>
            </div>
            <div className={cn("item")}>
            <p className={cn("label")}> {createdAtMessage}:</p><span className={cn("value")}>{date}</span>
            </div>
            </div >
            <div className={cn("price")}>
            <h2><b>{priceMessage}:  {price} ₽</b></h2>
            </div>
            <Button onClick={callbacks.onAdd} style="primary"  title={buttonMessage} />
        
        </div>
        </>
    )
}
ItemDetail.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string,
    title: PropTypes.string,
    dateCreate: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};
export default memo(ItemDetail)