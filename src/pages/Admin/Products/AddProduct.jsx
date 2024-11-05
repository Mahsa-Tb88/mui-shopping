import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ProductForm from "./ProductForm";
import { useCreateProduct } from "../../../utils/mutation";

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
