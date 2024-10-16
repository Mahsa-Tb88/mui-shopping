import { Grid2, Pagination, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import LoadingError from "../LoadingError";

export default function Products() {
  const shop = useSelector((state) => state.shop);
  const totalPage = Math.ceil(shop.totalProducts / shop.limit);

  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useSelector((state) => state.app.isMobile);

  function pageHandler(e, value) {
    const params = getNewSearchParams(
      searchParams,
      "page",
      value > 1 ? value : null
    );
    window.scrollTo({ top: 0 });
    setSearchParams(params);
  }

  if (!shop.products.length) {
    return <LoadingError message="Product not found!" />;
  }

  return (
    <Grid2 container spacing={3} sx={{ mt: 10 }}>
      {shop.products.map((p) => {
        return (
          <Grid2 key={p._id} size={{ xs: 12, sm: 6, md: 3, lg: 4 }}>
            <ProductCard product={p} />
          </Grid2>
        );
      })}
      <Grid2 size={12} sx={{ mt: 3 }}>
        <Paper>
          <Pagination
            count={totalPage}
            page={shop.page}
            onChange={pageHandler}
            color="primary"
            sx={{
              p: 1,
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
            }}
            showFirstButton={!isMobile}
            showLastButton={!isMobile}
            siblingCount={isMobile ? 0 : 1}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
}
