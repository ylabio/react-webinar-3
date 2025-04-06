import { useLocation } from 'react-router';
import {getLangFromPath} from "../../utils";

export const useLang = () => {
  const location = useLocation();
  return getLangFromPath(location.pathname);
};
