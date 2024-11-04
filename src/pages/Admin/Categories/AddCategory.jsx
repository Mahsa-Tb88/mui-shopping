import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CategoryForm from "./CategoryForm";
import { useCreateCategory } from "../../../utils/mutation";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../../store/slices/appSlice";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const mutation = useCreateCategory();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.app.categories);

  function handleSubmit(data) {
    mutation.mutate(data, {
      onSuccess(d) {
        console.log(d);
        dispatch(appActions.setCategories([...categories, d.data.body]));
        navigate("/admin/categories/edit/" + d.data.body._id);
      },
      onError(error) {},
    });
  }
  return (
    <Stack>
      <Typography variant="h4" textAlign="left" sx={{ my: 1 }}>
        New Category
      </Typography>
      <Divider sx={{ my: 3 }} />

      <CategoryForm submitForm={handleSubmit} type="new" mutation={mutation} />
    </Stack>
  );
}
