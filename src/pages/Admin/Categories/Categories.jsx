import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import MyTable from "../../../components/Customized/MyTable";
import { useDeleteCategory } from "../../../utils/mutation";
import Toast from "../../../components/Toast";
import { appActions } from "../../../store/slices/appSlice";

export default function Categories() {
  const categories = useSelector((state) => state.app.categories);
  console.log("....", categories);
  const [limit, setLimit] = useState(5);

  const [successMsg, setSuccessMsg] = useState("");
  const [failMsg, setFailMsg] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  let page = +(searchParams.get("page") ?? 1);
  const totalPages = Math.ceil(categories.length / limit);

  const { mutate, isPending } = useDeleteCategory();
  const dispatch = useDispatch();
  function deleteHandler(id) {
    if (confirm("Are you sure to delete?")) {
      mutate(id, {
        onSuccess(data) {
          setSuccessMsg(data.data.message);
          const newCategories = categories.filter(
            (category) => category._id != id
          );
          console.log("newcategories...", newCategories);
          dispatch(appActions.setCategories(newCategories));
          setTimeout(() => {
            setSuccessMsg("");
          }, 4000);
        },
        onerror(error) {
          setFailMsg(error.message);
          setTimeout(() => setFailMsg(""), 4000);
        },
      });
    }
  }

  let start = (page - 1) * limit;
  if (!categories[start] && page > 1) {
    setSearchParams(page == 2 ? {} : { page: page - 1 });
  }
  let updateCategories = categories.slice(start, start + limit);
  function handleSetPage(e, p) {
    setSearchParams(p == 0 ? {} : { page: p + 1 });
  }
  function handleLimitChange(e) {
    setLimit(e.target.value);
  }

  let status;
  let message;
  if (isPending) {
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
    <Container>
      <Box sx={{ textAlign: "left", my: 2 }}>
        <Typography variant="h4">Management Categories</Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          size="medium"
          sx={{ my: 2 }}
          LinkComponent={Link}
          to="add"
        >
          Add Category
        </Button>
      </Box>
      <MyTable sx={{ width: "100%" }}>
        <Toast status={status} message={message} />
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
              {updateCategories.map((c) => {
                return (
                  <TableRow key={c._id}>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.slug}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteHandler(c._id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        LinkComponent={Link}
                        to={"edit/" + c._id}
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
            count={categories.length}
            labelDisplayedRows={({ page }) => {
              return "Page " + (page + 1) + " of " + totalPages;
            }}
          />
        </TableContainer>
      </MyTable>
    </Container>
  );
}
