import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useProducts } from "../../../utils/queries";
import Loading from "../../Public/Loading";
import { ChevronLeft, Delete, Edit, Refresh } from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingError from "../../Public/LoadingError";
import Add from "@mui/icons-material/Add";
import MyTable from "../../../components/Customized/MyTable";
import { useSelector } from "react-redux";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get("page") ?? 1);
  const navigate = useNavigate();
  const shop = useSelector((state) => state.shop);
  const totalPage = Math.ceil(shop.totalProducts / shop.limit);
  const limit = shop.limit;
  const { isPending, data, error, refetch } = useProducts(
    page,
    (q = ""),
    (category = ""),
    limit,
    (order = ""),
    (sort = "")
  );

  const isMobile = useSelector((state) => state.app.isMobile);

  function pageHandler(e, value) {}

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
  console.log(data);
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
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        LinkComponent={Link}
                        onClick={() => navigate("edit")}
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
        count={totalPage}
        page={shop.page}
        color="primary"
        onChange={pageHandler}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        siblingCount={isMobile ? 0 : 1}
      />
    </Container>
  );
}
