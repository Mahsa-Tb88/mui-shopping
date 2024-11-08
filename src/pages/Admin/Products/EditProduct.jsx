import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { useProductById } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../Public/Loading";
import LoadingError from "../../Public/LoadingError";

export default function EditProduct() {
  const { id } = useParams();
  const { isPending, error, data, refetch } = useProductById(id);

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
  }

  const product = data?.data.body;
  console.log(data);
  return (
    <Stack>
      <Typography variant="h4" textAlign="left">
        Edit Product
      </Typography>
      <Divider sx={{ my: 2 }} />
      <ProductForm product={product} type="edit" />
    </Stack>
  );
}
