import './style.css';
import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";

function ProductInfo({ product }) {
  const { description, madeIn, category, edition, price } = product;

  const cn = bem('Product');



  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>

      <div className={cn('info')}>
        <div className={cn('info-keys')}>
          <span>Страна производитель:</span>
          <span>Категория:</span>
          <span>Год выпуска:</span>
        </div>
        <div className={cn('info-values')}>
          <span><b>{madeIn?.title}</b></span>
          <span><b>{category?.title}</b></span>
          <span><b>{edition}</b></span>
        </div>
      </div>

      <div className={cn('price')}>
        Цена: <span>{numberFormat(price)} &#8381; </span>
      </div>
    </div>
  )
}

export default memo(ProductInfo);
