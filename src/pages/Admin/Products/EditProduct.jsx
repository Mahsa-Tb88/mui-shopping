import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ProductForm from "./ProductForm";

export default function EditProduct() {
  return (
    <Stack>
      <Typography variant="h4" textAlign="left">
        Edit Product
      </Typography>
      <Divider sx={{ my: 2 }} />
      <ProductForm />
    </Stack>
  );
}
