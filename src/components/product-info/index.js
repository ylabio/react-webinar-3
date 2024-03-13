import { memo } from "react"
import "./style.css"

function ProductInfo(props) {

    const isRus = props.lang === 'ru'

    return (
        <div className="Product-Info">
            <p className='Product-Info-description'>{props.item.description}</p>
            <p className='Product-Info-region'>Страна производитель: <strong>{props.item.madeIn.title} ({props.item.madeIn.code})</strong></p>
            <p className='Product-Info-category'>Категория: <strong>{props.item.category.title}</strong></p>
            <p className='Product-Info-year'>Год выпуска: <strong>{props.item.edition}</strong></p>
            <p className='Product-Info-price'>Цена: {props.item.price} ₽</p>
            <button
                onClick={() => props.addToBasket(props.item._id)}
            >{isRus ? "Добавить" : "Add"}</button>
        </div>
    )
}

export default memo(ProductInfo)