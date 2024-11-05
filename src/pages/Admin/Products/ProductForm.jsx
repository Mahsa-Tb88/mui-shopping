import { Delete, Upload } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/no-image.jpg";
import { uploadFile, useCreateProduct } from "../../../utils/mutation";
import { LoadingButton } from "@mui/lab";
export default function ProductForm({ product, type }) {
  const [imageChanged, setImageChanged] = useState("");
  const [selectedImage, setSelectedImage] = useState(noImage);
  const [failMessage, setFailMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      title: product ? product.title : "",
      description: product ? product.description : "",
      price: product ? product.price : "",
      image: product ? product.image : "",
    },
  });

  const categories = useSelector((state) => state.app.categories);

  const imageField = { ...register("image") };

  async function handleSelectImage(e) {
    imageField.onChange(e);
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageChanged(true);
      const result = await uploadFile(file);
      if (result.success) {
        setSelectedImage(SERVER_URL + result.body.url);
      } else {
        setFailMessage(result.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
  }

  console.log(",,,,", selectedImage);

  function handleRemoveImage() {
    setSelectedImage(noImage);
    setValue("image", "");
  }
  const createMutation = useCreateProduct();

  function onSubmit(data) {
    data.image = selectedImage.replace(SERVER_URL, "");
    console.log(data);

    createMutation.mutate(data, {
      onSuccess(d) {
        console.log(d);
      },
      onError(error) {},
    });
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>
      {failMessage ? failMessage : ""}
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
        {...register("description", {
          required: "Please enter a desc",
          minLength: { value: 10, message: "at least 5 characters" },
          maxLength: { value: 2000, message: "at least 20010 characters" },
        })}
        multiline
        minRows={4}
        maxRows={8}
        error={errors.desc}
        helperText={errors.description?.message}
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

      <Stack spacing={3}>
        <Typography variant="h5" textAlign="left">
          Image Product
        </Typography>
        <Stack spacing={3} direction="row">
          <Stack spacing={2}>
            <TextField
              type="file"
              {...imageField}
              id="imageFile"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleSelectImage}
            />
            <Button
              endIcon=<Upload />
              sx={{ maxWidth: 300 }}
              component="label"
              htmlFor="imageFile"
              size="large"
            >
              Add Image
            </Button>
            <Button
              endIcon=<Delete />
              color="error"
              sx={{ maxWidth: 300 }}
              size="large"
              onClick={handleRemoveImage}
            >
              Remove Image
            </Button>
          </Stack>
          <Stack>
            <img
              width={180}
              height={180}
              style={{ border: "var(--border)" }}
              src={selectedImage}
            />
          </Stack>
        </Stack>
      </Stack>

      <LoadingButton
        loading={createMutation.isPending}
        loadingIndicator={
          <CircularProgress size={30} sx={{ color: "grey.500" }} />
        }
        size="large"
        type="submit"
        sx={{ alignSelf: "center", fontSize: 18 }}
        variant="contained"
      >
        {type == "new" ? "Create Product" : "Update Product"}
      </LoadingButton>
    </Stack>
  );
}
