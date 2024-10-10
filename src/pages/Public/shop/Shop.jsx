import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import LoadingError from "../LoadingError";
import { useProducts } from "../../../utils/queries";
import Products from "./Products";
import { Container, Grid2 } from "@mui/material";
import FilterDrawer from "./FilterDrawer";
import Sidebar from "./Sidebar";
import { useSearchParams } from "react-router-dom";
import { shopActions } from "./shopSlice";

export default function Shop() {
  const shop = useSelector((state) => state.shop);
  const isMobile = useSelector((state) => state.app.isMobile);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { isPending, data, error, refetch } = useProducts(
    shop.page,
    shop.q,
    shop.category,
    shop.limit,
    shop.order,
    shop.sort
  );

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    const limit = parseInt(searchParams.get("limit") || 6);
    const category = searchParams.get("category") || "";
    const q = searchParams.get("q") || "";
    const sort = searchParams.get("sort") || "_id";
    const order = searchParams.get("order") || "desc";

    dispatch(shopActions.setFilter(page, limit, category, q, sort, order));
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      dispatch(shopActions.setProducts(data.data.body.products));
      dispatch(shopActions.setTotalProducts(data.data.body.count));
    }
  }, [data]);

  let content;
  if (isPending) {
    content = <Loading />;
  } else if (error) {
    content = <LoadingError message={error.message} handleAction={refetch} />;
  } else {
    content = <Products />;
  }

  return (
    <Container>
      <Grid2 container spacing={3}>
        {isMobile ? (
          <FilterDrawer />
        ) : (
          <Grid2 size={{ md: 4, lg: 3 }}>
            <Sidebar />
          </Grid2>
        )}
        <Grid2 size={{ sx: 12, md: 8, lg: 9 }}>{content}</Grid2>
      </Grid2>
    </Container>
  );
}
