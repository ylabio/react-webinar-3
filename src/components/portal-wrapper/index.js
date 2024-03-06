import { createPortal } from "react-dom";

function ReactPortal({ children }) {
  return createPortal(children, document.getElementById("modal"));
}
export default ReactPortal;
