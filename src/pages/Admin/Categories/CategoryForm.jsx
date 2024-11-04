import { CircularProgress, Stack, TextField } from "@mui/material";
import React from "react";
import MyTable from "../../../components/Customized/MyTable";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Mutation } from "@tanstack/react-query";

export default function CategoryForm({ category, type, submitForm, mutation }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: category ? category.title : "",
      slug: category ? category.slug : "",
    },
  });

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit(submitForm)}>
      <TextField
        label="title"
        {...register("title", {
          required: "Please enter a title",
          minLength: { value: 3, message: "at least 3 charcters" },
        })}
        error={errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        label="slug"
        {...register("slug", {
          required: "Please enter a slug",
          minLength: { value: 3, message: "at least 3 charcters" },
        })}
        error={errors.slug}
        helperText={errors.slug?.message}
      />
      <LoadingButton
        variant="contained"
        size="large"
        sx={{ maxWidth: 200 }}
        type="submit"
        loading={mutation.isPending}
        loadingIndicator={<CircularProgress size={30} color="gray.900" />}
      >
        {type == "new" ? "Add Category" : "Update Category"}
      </LoadingButton>
    </Stack>
  );
}
