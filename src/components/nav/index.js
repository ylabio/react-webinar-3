import { memo } from "react";
import { getTranslation } from "../../utils";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";

function Nav() {
  const select = useSelector((state) => ({
    languages: state.language,
  }));

  return (
    <div>
      <Link to={`/`}>{getTranslation("main")}</Link>
    </div>
  );
}

export default memo(Nav);
