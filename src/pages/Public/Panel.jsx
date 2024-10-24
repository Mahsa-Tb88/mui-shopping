import React from "react";
import { useSelector } from "react-redux";
import { useRedirectIfLoggedIn } from "../../utils/customHooks";

export default function Panel() {
  const user = useSelector((state) => state.user);
  const isLoggedIn = useRedirectIfLoggedIn();
  return <div>Panel</div>;
}
