import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../store/slices/appSlice";

import { useInitialize } from "../utils/queries";
import { userActions } from "../store/slices/userSlice";
import { Stack } from "@mui/material";
import Loading from "../pages/Public/Loading";
import LoadingError from "../pages/Public/LoadingError";

export default function Initializer() {
  const { data, isPending, error, refetch } = useInitialize();

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const { body } = data.data;
      dispatch(appActions.setInitialized(true));
      dispatch(appActions.setCategories(body.categories));
      if (body?.user) {
        dispatch(userActions.setIsLoggedIn(true));
        if (body.user.role === "admin") {
          dispatch(userActions.setIsAdmin(true));
        }
        dispatch(userActions.setProfile(body.user));
      }
    }
  }, [data]);

  return (
    <Stack
      sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
    >
      {isPending ? (
        <Loading />
      ) : (
        error && <LoadingError message={error.message} handleAction={refetch} />
      )}
    </Stack>
  );
}
