import { createContext, useContext, useState, useEffect } from 'react';
import { STRINGS } from './const';

const AppContext = createContext();

export const AppProvider = ({ children, store  }) => {
  const [headerTitle, setHeaderTitle] = useState(STRINGS.SHOP[language]);
  const [basketState, setBasketState] = useState({
    amount: 0,
    sum: 0
  });
  const [language, setLanguage] = useState('RU')

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      setBasketState({
        amount: state.basket.amount,
        sum: state.basket.sum
      });
    });
    return () => unsubscribe();
  }, [store]);

  const openBasketModal = () => {
    store.actions.modals.open('basket');
  };

  const addToBasket = (_id) => {
    store.actions.basket.addToBasket(_id)
  };

  const onSetLanguage = () => {
    setLanguage(language === 'RU' ? 'EN' : 'RU');
  }

  useEffect(() => {
    setHeaderTitle(STRINGS.SHOP[language]);
  }, [language]);

  const value = {
    headerTitle,
    setHeaderTitle,
    basket: {
      ...basketState,
      openModal: openBasketModal,
      addToBasket: addToBasket,
    },
    language,
    onSetLanguage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};