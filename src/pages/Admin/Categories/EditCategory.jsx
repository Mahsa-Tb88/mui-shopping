import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CategoryForm from "./CategoryForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCategory } from "../../../utils/mutation";
import { appActions } from "../../../store/slices/appSlice";

export default function EditCategory() {
  const { id } = useParams();
  const categories = useSelector((state) => state.app.categories);
  const category = categories.find((c) => c._id == id);
  const dispatch = useDispatch();
  const mutation = useUpdateCategory(id);

  function handleSubmit(data) {
    data.id = id;
    mutation.mutate(data, {
      onSuccess(d) {
        console.log(data);
        const newCategories = categories.map((c) => {
          if (c._id == id) {
            return { title: data.title, slug: data.slug, _id: id };
          } else {
            return c;
          }
        });
        dispatch(appActions.setCategories(newCategories));
      },
    });
  }
  return (
    <Stack>
      <Typography variant="h4" textAlign="left">
        Edit Category
      </Typography>
      <Divider sx={{ my: 2 }} />
      <CategoryForm
        category={category}
        mutation={mutation}
        type="edit"
        submitForm={handleSubmit}
      />
    </Stack>
  );
}
