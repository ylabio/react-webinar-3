import 'style.css';
import Button from '../button';

function ProductInfo({ 
                description,
                country,
                countryCode,
                category,
                edition,
                price,
                addToBasket,
                id,
                text}) {
return(
    <div>
        <p>{description}</p>
        <div className="product-info">
            <div className="product-info-item">
                <span>{text.originCountry}</span>
                <b>{country} ({countryCode ?? ''})</b>
            </div>
            <div className="product-info-item">
                <span>{text.category}</span>
                <b>{category}</b>
            </div>
            <div className="product-info-item">
                <span>{text.releaseYear}</span>
                <b>{edition}</b>
            </div>
        </div>
        <p className="price">{text.price} {`${price} ₽`}</p>
        <Button style="primary" onClick={() => addToBasket(id)} title={text.addButton} />
    </div>
);
}

export default ProductInfo;