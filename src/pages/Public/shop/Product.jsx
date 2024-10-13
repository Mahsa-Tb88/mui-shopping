import { Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useProductById } from "../../../utils/queries";

export default function Product() {
  const { id } = useParams();
  const { isPending, data, error, refetch } = useProductById(id);
  return <Stack></Stack>;
}
