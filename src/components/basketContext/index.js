import React,{useContext, useState} from "react";

export const BasketContext = React.createContext();

export const useBasket = () => {
    return useContext(BasketContext);
}

export const BasketProvider = ({children}) => {
    const [basketVisible,setBasketVisible] = useState(false);

    const onBasketVisible = () => {
        setBasketVisible(!basketVisible);
      }

    return (
        <BasketContext.Provider value = {{
            visible:basketVisible,
            onBasketVisible
        }}>
            {children}
        </BasketContext.Provider>
    )
}