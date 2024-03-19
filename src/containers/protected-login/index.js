import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/use-session";

function ProtectedLogin({ children }) {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (session) {
      navigate("/profile");
    }
  }, [session]);

  if (!session) return <div>{children}</div>;
}

export default memo(ProtectedLogin);
