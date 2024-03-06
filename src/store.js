import { priceFormat } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.basket = [];
    this.totalAmount=0;
    this.totalCount=0;
    this.basketList={}
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    this.state.total=this.informationForPriceAndCount();
    return this.state;
  }
setLocalStorage(basket){
  localStorage.setItem('basket',JSON.stringify(basket));
}
getLocalStorage(){
  const newBasket=JSON.parse(localStorage.getItem('basket'))
  if(newBasket!=null){
    this.basket=newBasket;
    this.updateBasketList()
  }
}
informationForPriceAndCount(){
  return {countProduct:this.basket.length, price: this.totalAmount}
}
  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  setBasket(newBasket) {
    this.basket = newBasket;
    this.setLocalStorage(this.basket)
    this.updateBasketList()
    for (const listener of this.listeners) listener();
  }
  deleteBasketItem(code){
    this.basket=this.basket.filter((elem)=>elem.code!=code)
    this.setLocalStorage(this.basket)
    this.updateBasketList()
    for (const listener of this.listeners) listener();
  }
  getBasketList(){
   return this.basketList
  }
 
  addItemBasket(code) {
    if(this.basket.length===0){
      this.setBasket([{code:code, count:1}]);
    }else
    {
      let flag=false;
       const newBasket=this.basket.map((item)=>{
        if(item.code===code){
          flag=true;
          return{code:item.code, count:item.count+1}}
        else{
          return item;
        }})
       
      if(flag){
        this.setBasket(newBasket);
      } else{
        this.setBasket([...this.basket,{code:code, count:1}]);
      }
      
    }
    
    
}


updateBasketList(){
  let count=0;
  let totalAmount=0;
  let basketList=[]
  const newState=this.state.list;
for(let state of newState){
for(let basket of this.basket){
if(state.code===basket.code){
  count=count+basket.count;
  totalAmount=totalAmount+state.price*basket.count;
  basketList.push({...state,count:basket.count})
 
}
}
}

this.totalAmount=totalAmount;
this.totalCount=count;
this.basketList={list:basketList, total:this.informationForPriceAndCount(), };

}



  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
