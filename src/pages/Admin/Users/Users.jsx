import React, { useState } from "react";
import { useUser } from "../../../utils/queries";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import Loading from "../../Public/Loading";
import LoadingError from "../../Public/LoadingError";
import { Link, useSearchParams } from "react-router-dom";
import MyTable from "../../../components/Customized/MyTable";
import { useDeleteUser } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "../../../components/Toast";

export default function Users() {
  const { isPending, data, error, refetch } = useUser();
  const users = data?.data?.body.users;
  console.log(data);

  const [searchParams, setSearchParams] = useSearchParams();
  const [successMsg, setSuccessMsg] = useState("");
  const [failMsg, setFailMsg] = useState("");

  const [limit, setLimit] = useState(5);
  const page = +(searchParams.get("page") ?? 1);

  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Loading />
      </Stack>
    );
  } else if (error) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <LoadingError message={error.message} handler={reftetch} />
      </Stack>
    );
  } else if (!users.length) {
    return (
      <Stack>
        <Typography>There is no user</Typography>
      </Stack>
    );
  }

  function handleSetPage(e, p) {
    setSearchParams(p == 0 ? {} : { page: p + 1 });
  }

  function handleLimitChange(e) {
    setLimit(e.target.value);
  }

  const mutation = useDeleteUser();
  const querryClient = useQueryClient();

  function deleteHandler(id) {
    mutation.mutate(id, {
      onSuccess(data) {
        setSuccessMsg(data.data.message);
        setTimeout(() => {
          setSuccessMsg("");
        }, 4000);
        querryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
      onError(error) {
        setFailMsg(error.message);
        setTimeout(() => {
          setFailMsg("");
        }, 4000);
      },
    });
  }

  let status;
  let message;

  if (mutation.isPending) {
    status = "pending";
    message = "Deleting...";
  } else if (successMsg) {
    message = successMsg;
    status = "success";
  } else if (failMsg) {
    message = failMsg;
    status = "fail";
  }

  return (
    <Stack>
      <Box sx={{ textAlign: "left", my: 2 }}>
        <Typography variant="h4">Users Management</Typography>
        <Button
          size="medium"
          startIcon={<Add />}
          sx={{ my: 2 }}
          LinkComponent={Link}
          to="add"
        >
          Add User
        </Button>
        <Toast status={status} message={message} />
      </Box>
      <MyTable>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Full name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {user.firstname + " " + user.lastname}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        LinkComponent={Link}
                        to={"edit/" + user._id}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
            onPageChange={handleSetPage}
            page={page - 1}
            rowsPerPage={limit}
            onRowsPerPageChange={handleLimitChange}
            rowsPerPageOptions={[
              { label: 5, value: 5 },
              { label: 10, value: 10 },
              { label: 15, value: 15 },
            ]}
            count={users.length}
            labelDisplayedRows={({ page }) => {
              return (
                "Page " + (page + 1) + " of " + Math.ceil(users.length / limit)
              );
            }}
          />
        </TableContainer>
      </MyTable>
    </Stack>
  );
}
