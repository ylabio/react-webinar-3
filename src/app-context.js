import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children, store  }) => {
  const [headerTitle, setHeaderTitle] = useState('Магазин');
  const [basketState, setBasketState] = useState({
    amount: 0,
    sum: 0
  });

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

  const value = {
    headerTitle,
    setHeaderTitle,
    basket: {
      ...basketState,
      openModal: openBasketModal
    },
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