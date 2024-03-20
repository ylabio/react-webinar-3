import { cn as bem } from "@bem-react/classname";
import "./style.css";
const ModalUser = ({ children }) => {
  const cn = bem("ModalUser");
  return <div className={cn()}>{children}</div>;
};

export default ModalUser;
