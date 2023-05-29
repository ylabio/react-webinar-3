import { cn as bem } from '@bem-react/classname';
import BasketTool from "../basket-tool";
import './style.css';
import {memo} from "react";
import MainLink from "../main-link";

function PageTool({sum, amount, onOpen}) {
  const cn = bem('PageTool')
  return (
    <div className={cn()}>
      <MainLink />
      <BasketTool sum={sum} amount={amount} onOpen={onOpen} />
    </div>
  )
}

export default memo(PageTool);