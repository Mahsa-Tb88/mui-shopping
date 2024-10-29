import {
  Box,
  Button,
  Container,
  IconButton,
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
import { useProducts } from "../../../utils/queries";
import Loading from "../../Public/Loading";
import { ChevronLeft, Delete, Edit, Refresh } from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingError from "../../Public/LoadingError";
import Add from "@mui/icons-material/Add";
import MyTable from "../../../components/Customized/MyTable";
import { useDeleteProduct } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "../../../components/Toast";

export default function Products() {
  const [limit, setLimit] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get("page") ?? 1);
  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState("");
  const [failMsg, setFailMsg] = useState("");

  let q = "";
  let category = "";
  const { isPending, data, error, refetch } = useProducts(
    page,
    q,
    category,
    limit
  );
  const totalProducts = data?.data?.body?.count;
  const totalPages = Math.ceil(data?.data?.body?.count / limit);

  function setPageHandler(e, p) {
    setSearchParams(p == 0 ? {} : { page: p + 1 });
  }

  function handleLimitChange(e) {
    setLimit(e.target.value);
  }

  const mutation = useDeleteProduct();
  const querryClient = useQueryClient();
  function deleteHandler(id) {
    mutation.mutate(id, {
      onSuccess(data) {
        setSuccessMsg(data.data.message);
        setTimeout(() => {
          setSuccessMsg("");
        }, 4000);
        querryClient.invalidateQueries({
          queryKey: ["products"],
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

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Loading />
      </Box>
    );
  } else if (error) {
    let text;
    let icon;
    let handler;
    if (error?.response?.data?.code == "404") {
      text = "Back";
      icon = <ChevronLeft />;
      handler = () => navigate("/admin");
    } else {
      text = "Try Again";
      icon = <Refresh />;
      handler = refetch;
    }
    message = error.message;

    return (
      <Box>
        <LoadingError
          message={message}
          actionIcon={icon}
          actionText={text}
          handleAction={handler}
        />
      </Box>
    );
  }
  const products = data?.data?.body?.products;

  return (
    <Container>
      <Box sx={{ textAlign: "left" }}>
        <Typography component="h1" variant="h4" sx={{ my: 2 }}>
          Manage Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="medium"
          sx={{ my: 2 }}
          LinkComponent={Link}
          to="add"
        >
          Add Product
        </Button>
        <Toast status={status} message={message} />
      </Box>
      <MyTable>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Row</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p, index) => {
                return (
                  <TableRow key={p._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{p.category.title}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteHandler(p._id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        LinkComponent={Link}
                        to={"edit/" + p._id}
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
        count={totalProducts}
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
          return "Page " + (page + 1) + " of " + totalPages;
        }}
      />
    </Container>
  );
}
