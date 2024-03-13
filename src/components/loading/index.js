import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { LanguageContext } from "../../languages/languagesContext";

function Loading({children,isLoading}) {

  let { dict } = useContext(LanguageContext)
  const cn = bem('Loading');
  return (
    <div className={cn()}>
      {isLoading?<h2 className={cn('title')}>{dict.loading}...</h2>:children}
    </div>
  );
}

Loading.propTypes = {
  isLoading:PropTypes.bool
};

Loading.defaultProps = {
}

export default memo(Loading);
