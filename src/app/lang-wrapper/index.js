import { memo, useEffect } from 'react';
import {useLocation} from "react-router";

const LangWrapper = ({ children }) => {
  const location = useLocation();
  const lang = location.pathname.split('/')[1] || 'ru';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return children;
};

export default memo(LangWrapper);
