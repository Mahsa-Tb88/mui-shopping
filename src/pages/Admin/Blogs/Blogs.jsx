import React, { useState } from "react";
import { useBlogs } from "../../../utils/queries";
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
import MyTable from "../../../components/Customized/MyTable";
import Loading from "../../Public/Loading";
import LoadingError from "../../Public/LoadingError";
import { Link, useSearchParams } from "react-router-dom";
import { useDeleteBlog } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "../../../components/Toast";

export default function Blogs() {
  const [limit, setLimit] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [successMsg, setSuccessMsg] = useState();
  const [failMsg, setFailMsg] = useState();

  const page = +(searchParams.get("page") ?? 1);
  const { isPending, error, data, refetch } = useBlogs(page, limit);

  const blogs = data?.data?.body;
  console.log(data);
  const totalBlogs = data?.data?.totalBlogs?.all;

  function setPageHandler(e, p) {
    setSearchParams(p == 0 ? {} : { page: p + 1 });
  }

  function handleLimitChange(e) {
    setLimit(e.target.value);
    setSearchParams({});
  }

  const mutation = useDeleteBlog();
  const querryClient = useQueryClient();
  function deleteHandler(id) {
    mutation.mutate(id, {
      onSuccess(data) {
        setSuccessMsg(data.data.message);
        setTimeout(() => setSuccessMsg(""), 4000);
        querryClient.invalidateQueries({
          queryKey: ["blogs"],
        });
      },
      onError(error) {
        setFailMsg(error.message);
        setTimeout(() => setFailMsg(""), 4000);
      },
    });
  }

  let status;
  let message;
  if (mutation.isPending) {
    status = "pending";
    message = "Deleting....";
  } else if (successMsg) {
    status = "success";
    message = successMsg;
  } else if (failMsg) {
    status = "fail";
    message = failMsg;
  }
  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Loading />
      </Stack>
    );
  } else if (error) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <LoadingError message={error.message} handleAction={refetch} />
      </Stack>
    );
  } else if (!totalBlogs) {
    return (
      <Box>
        <Typography>There is no blog yet!</Typography>
      </Box>
    );
  }
  return (
    <Stack>
      <Box sx={{ textAlign: "left", my: 2 }}>
        <Typography variant="h4">Blogs Management</Typography>
        <Button
          startIcon={<Add />}
          size="medium"
          variant="contained"
          sx={{ my: 2 }}
          LinkComponent={Link}
          to="add"
        >
          Add Blog
        </Button>
        <Toast status={status} message={message} />
      </Box>

      <MyTable>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((b) => {
                return (
                  <TableRow key={b._id}>
                    <TableCell>{b.title}</TableCell>
                    <TableCell>{b.slug}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteHandler(b._id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        LinkComponent={Link}
                        to={"edit" + b._id}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MyTable>
      <TablePagination
        component="div"
        sx={{ display: "flex", justifyContent: "center" }}
        count={totalBlogs}
        page={page - 1}
        onPageChange={setPageHandler}
        rowsPerPage={limit}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPageOptions={[
          { label: 5, value: 5 },
          { label: 10, value: 10 },
          { label: 15, value: 15 },
        ]}
        labelDisplayedRows={({ page }) => {
          return "Page " + (page + 1) + " of " + Math.ceil(totalBlogs / limit);
        }}
      />
    </Stack>
  );
}
