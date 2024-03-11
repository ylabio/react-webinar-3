import { memo, useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function SelectLanguage(props) {

  const cn = bem('SelectLanguage');

  return (
    <div className={cn()}>
      {props.language.map((item, i) => {
        return <button className={cn('button')} onClick={() => props.onChangeLanguage(item.value)} key={i}>{item.title}</button>
      } ) }
    </div>
  )
}

SelectLanguage.propTypes = {
  language: PropTypes.array,
  onChangeLanguage: PropTypes.func,
};

SelectLanguage.defaultProps = {
  onChangeLanguage: () => {}
};

export default memo(SelectLanguage);