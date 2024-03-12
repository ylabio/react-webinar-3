import { Link } from "react-router-dom";

function Nav({ translation }) {
  return (
    <Link to={"/"} className="Link">
      {translation.main}
    </Link>
  );
}

export default Nav;
