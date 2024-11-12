import { Delete, Upload } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/no-image.jpg";
import {
  useCreateProduct,
  useUpdateProduct,
  useUploadFile,
} from "../../../utils/mutation";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "@tanstack/react-query";
export default function ProductForm({ product, type }) {
  const [imageChanged, setImageChanged] = useState("");
  const [selectedImage, setSelectedImage] = useState(noImage);
  const [failMessage, setFailMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const mutationUploadFile = useUploadFile();
  const queryClient = useQueryClient();

  function handleSelectImage(e) {
    imageField.onChange(e);
    const file = e.target.files[0];
    if (file) {
      setImageChanged(true);
      const form = new FormData();
      form.append("file", file);
      mutationUploadFile.mutate(form, {
        onSuccess(d) {
          setSelectedImage(SERVER_URL + d.data.body.url);
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          queryClient.invalidateQueries({
            queryKey: ["products", product._id],
          });
        },
        onError(error) {
          setFailMessage(error.message);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        },
      });
    }
  }

  useEffect(() => {
    if (type == "edit" && product?.image) {
      setSelectedImage(SERVER_URL + product.image);
    } else if (type == "edit" && !product.image) {
      setSelectedImage(noImage);
    }
  }, []);

  function handleRemoveImage() {
    setSelectedImage(noImage);
    setValue("image", "");
  }
  const createMutation = useCreateProduct();
  const editMutation = useUpdateProduct();

  function onSubmit(data) {
    if (data.image?.length && imageChanged) {
      data.image = selectedImage.replace(SERVER_URL, "");
    }

    if (type == "new") {
      console.log("submit new form...", data);
      createMutation.mutate(data, {
        onSuccess(d) {
          setSuccessMessage(d.data.message);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onError(error) {
          setFailMessage(error.message);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    } else {
      data.id = product._id;
      console.log("submit edit form...", data);
      editMutation.mutate(data, {
        onSuccess(d) {
          setSuccessMessage(d.data.message);
          window.scrollTo({ top: 0, behavior: "smooth" });
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          queryClient.invalidateQueries({
            queryKey: ["products", product._id],
          });
        },
        onError(error) {
          setFailMessage(error.message);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>
      {successMessage ? (
        <Typography variant="h5" color="success">
          {successMessage}{" "}
        </Typography>
      ) : failMessage ? (
        <Typography variant="h5" color="error">
          {failMessage}
        </Typography>
      ) : (
        ""
      )}
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
