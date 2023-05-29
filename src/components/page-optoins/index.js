import Menu from "../menu";
import BasketTool from "../basket-tool";
import './style.css'

const PageOptions = ({sum, amount, onOpen}) => {
  return (
    <div className='menu-options'>
      <Menu/>
      <BasketTool onOpen={onOpen} amount={amount}
                  sum={sum}/>
    </div>
  );
};

export default PageOptions;