import {memo, useCallback} from "react";
import BasketTool from "../basket-tool";
import {Link} from "react-router-dom";
import './style.css';
function Menu({translation, sum, amount, onOpen}) {
  const handleOnOpen = useCallback(() => { onOpen(); }, [onOpen]);
  return (
    <div className="Menu">
      <Link to={'/'}>{translation.homeLink}</Link>
      <BasketTool translation={translation} onOpen={handleOnOpen} amount={amount} sum={sum}/>
    </div>
  );
}

export default memo(Menu);