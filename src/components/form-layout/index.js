import "./style.css";
import {cn as bem} from "@bem-react/classname";

const FormLayout = ({children, ...props}) => {
  const cn = bem('FormLayout');
  return (
    <form {...props} className={cn()}>
      {children}
    </form>
  );
};

export default FormLayout;