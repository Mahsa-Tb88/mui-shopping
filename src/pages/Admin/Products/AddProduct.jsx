import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ProductForm from "./ProductForm";

export default function AddProduct() {
  return (
    <Stack>
      <Typography variant="h4" textAlign="left">
        New Product
      </Typography>
      <Divider sx={{ my: 4 }} />
      <ProductForm />
    </Stack>
  );
}
