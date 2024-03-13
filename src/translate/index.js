import { useContext,createContext,useState } from "react"

const Y_LabTranslate=createContext('en')
const useTranslate=()=>useContext(Y_LabTranslate)

const translations={
    'en-EN':{
shop:'Shop',
home:'Home',
inTheBasket:'In the basket',
goCart:'Go to cart',
empty:'empty',
product:'product',
products:'products',
add:'Add',
delete:'Delete',
closed:'Closed',
total:'Total',
country:'Manufacturer country',
category:'Category',
year:'Year of issue',
price:'Price',
    },
    'ru-RU':{
shop:'Магазин',
home:'Главная',
inTheBasket:'В корзине',
goCart:'Перейти',
empty:'Пусто',
product:'товар',
products:'товары',
add:'Добавить',
delete:'Удалить',
closed:'Закрыть',
total:'Итого',
country:'Страна производитель',
category:'Категория',
year:'Год выпуска',
price:'Цена',
    }
}
 const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru-RU');
  
    const translate = (key) => {
 
      return translations[language][key];
    };
  
    return (
      <Y_LabTranslate.Provider  value={{ language, setLanguage, translate }}>
        {children}
      </Y_LabTranslate.Provider>
    );
  };


export {LanguageProvider,useTranslate}