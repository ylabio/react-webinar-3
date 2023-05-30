import { useContext } from "react";
import { LangContext } from "./lang-context"

export default function useLang() {
  return useContext(LangContext);
}
