import { useCallback } from "react";

export function createHooks(store, setShow, setAddedAnimation) {
  const baseCallbacks = {
    onDeleteItem: useCallback((code) => {
      store.clearCartProductCard(code);
    }, [store]),

    onAddCart: useCallback((code) => {
      setAddedAnimation(true);

      store.addCartProductCard(code);

      setTimeout(() => {
        setAddedAnimation(false);
      }, 300);


    }, [store]),

    onShowCart: useCallback(() => {
      setShow(true);
    }, [setShow]),

    onHideCart: useCallback(() => {
      setShow(false);
    }, [setShow]),
  };

  // Функция для добавления новых колбэков
  function addCallback(name, callback) {
    baseCallbacks[name] = callback;
  }

  return { ...baseCallbacks, addCallback };
}
