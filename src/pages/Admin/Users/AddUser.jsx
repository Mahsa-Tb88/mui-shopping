import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import UserForm from "./UserForm";
import { useCreateUser } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const mutation = useCreateUser();
  const [successMsg, setSuccessMsg] = useState("");
  const [failMsg, setFailMsg] = useState("");
  const queryCliedn = useQueryClient();
  const navigate = useNavigate();

  function handleSubmit(data) {
    console.log("data...",data);
    mutation.mutate(data, {
      onSuccess(d) {
        setSuccessMsg(d.data.message);
        setInterval(() => setSuccessMsg(""), 3000);
        queryCliedn.invalidateQueries({
          queryKey: ["users"],
        });
        // setInterval(() => navigate("/admin/users/"), 3000);
      },
      onError(error) {
        setFailMsg(error.message);
      },
    });
  }

  return (
    <Stack sx={{ textAlign: "left" }}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Add User
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Stack sx={{ my: 3 }}>
        {successMsg ? (
          <Paper sx={{ textAlign: "center", py: 2 }}>
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
      </Stack>
      <UserForm type="new" submitForm={handleSubmit} mutation={mutation} />
    </Stack>
  );
}
