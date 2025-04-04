import { useCallback } from "react";

export function createHooks(store, setShow, setAddedAnimation) {
  const baseCallbacks = {
    onDeleteItem: useCallback((code) => {
      store.clearCartProductCard(code);
    }, [store]),

    onAddCart: useCallback((code) => {

      store.addCartProductCard(code);

    }, [store]),

    onShowCart: useCallback(() => {
      setShow(true);
    }, [setShow]),

    onHideCart: useCallback(() => {
      setShow(false);
    }, [setShow]),
  };


  return { ...baseCallbacks };
}
