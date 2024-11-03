import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import UserForm from "./UserForm";
import { useUpdateUser } from "../../../utils/mutation";
import { useGetUserById } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../Public/Loading";
import LoadingError from "../../Public/LoadingError";

export default function EditUser() {
  const { id } = useParams();
  const mutation = useUpdateUser();
  const { isPending, error, data, refetch } = useGetUserById(id);
  const user = data?.data?.body;

  const [successMsg, setSuccessMsg] = useState("");
  const [failMsg, setFailMsg] = useState("");

  function handleSubmit(data) {
    console.log(data);
    data.id = id;
    mutation.mutate(data, {
      onSuccess(d) {
        setSuccessMsg(d.data.message);
        setTimeout(() => setSuccessMsg(""), 4000);
      },
      onError(error) {
        setFailMsg(error.msg);
      },
    });
  }

  return (
    <Stack>
      {isPending ? (
        <Loading />
      ) : error ? (
        <LoadingError message={error.message} handleAction={refetch} />
      ) : (
        <Box>
          <Typography variant="h4" textAlign="left">
            Edit User
          </Typography>
          <Divider sx={{ my: 4 }} />
          {successMsg ? (
            <Paper sx={{ textAlign: "center", py: 2,my:3 }}>
              <Typography color="success" fontWeight={600}>
                {successMsg}
              </Typography>
            </Paper>
          ) : failMsg ? (
            <Paper sx={{ textAlign: "center", py: 2 }}>
              <Typography color="error" fontWeight={600}>
                {failMsg}
              </Typography>
            </Paper>
          ) : (
            ""
          )}
          <UserForm
            mutation={mutation}
            user={user}
            type="edit"
            submitForm={handleSubmit}
          />
        </Box>
      )}
    </Stack>
  );
}
