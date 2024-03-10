import {useContext} from "react";
import {TranslatorContext} from "./context";

/**
 * Хук для доступа к объекту хранилища
 * @return {Translator}
 */
export default function useTranslator() {
  return useContext(TranslatorContext);
}
