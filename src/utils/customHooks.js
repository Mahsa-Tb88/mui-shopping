import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useRedirectIfLoggedIn() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(isAdmin ? "/admin" : "/panel", { replace: true });
    }
  }, [isLoggedIn]);

  return isLoggedIn;
}

export function useIsLoggednIn() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  return isLoggedIn;
}
