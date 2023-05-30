import Loader from "../Loader";
import "./style.css";

function WithLoader({ isLoading, children }) {
  return <div className="With-loader">{isLoading ? <Loader /> : children}</div>;
}

export default WithLoader;
