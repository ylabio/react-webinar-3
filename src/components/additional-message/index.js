import "./style.css";
import {cn as bem} from "@bem-react/classname";

const AdditionalMessage = ({type, children}) => {
  const cn = bem('Text');
  return <p className={cn(type)}>{children}</p>;
};

export default AdditionalMessage;