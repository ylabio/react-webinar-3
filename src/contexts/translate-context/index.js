import { createContext, useContext } from "react";
import useTranslate from "../../hooks/use-translate";

const TranslateContext = createContext();

export function TranslateContextWrapper({ children }) {
  const translateValue = useTranslate();

  return (
    <TranslateContext.Provider value={translateValue}>
      {children}
    </TranslateContext.Provider>
  );
}

export function useTranslateContext() {
  return useContext(TranslateContext);
}
