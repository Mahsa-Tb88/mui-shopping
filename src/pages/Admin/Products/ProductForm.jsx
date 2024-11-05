import { InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function ProductForm({ product, formSubmit, type, mutation }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: product ? product.title : "",
      desc: product ? product.desc : "",
      price: product ? product.price : "",
    },
  });

  const categories = useSelector((state) => state.app.categories);

  return (
    <Stack component="form" onSubmit={handleSubmit(formSubmit)} spacing={5}>
      <TextField
        label="Title"
        {...register("title", {
          required: "Please enter a title",
          minLength: { value: 3, message: "at least 3 characters" },
        })}
        error={errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Description"
        {...register("desc", {
          required: "Please enter a desc",
          minLength: { value: 10, message: "at least 5 characters" },
          maxLength: { value: 2000, message: "at least 20010 characters" },
        })}
        multiline
        minRows={4}
        maxRows={8}
        error={errors.desc}
        helperText={errors.desc?.message}
      />
      <TextField
        label="Price"
        {...register("price", {
          validate(value) {
            if (isNaN(Number(value))) {
              return "Enter a price for the product";
            } else if (value < 10 || value > 1000000) {
              return "Price should be between 10-100000";
            }
          },
          valueAsNumber: true,
        })}
        error={errors.price}
        helperText={errors.price?.message}
        sx={{ maxWidth: 500 }}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
      />
      <TextField
        select
        label="Category"
        {...register("category")}
        error={errors.desc}
        helperText={errors.desc?.message}
        sx={{ maxWidth: 500, textAlign: "left" }}
        defaultValue={product?.category ?? categories[0]._id}
      >
        {categories.map((c) => {
          return (
            <MenuItem key={c._id} value={c._id}>
              {c.title}
            </MenuItem>
          );
        })}
      </TextField>
    </Stack>
  );
}
