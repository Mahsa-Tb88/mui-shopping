import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Shop from "./Shop";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/slices/cartSlice";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Add, Delete, Remove } from "@mui/icons-material";

export default function ProductCard({ product }) {
  const noImage = "";
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  function incHandler() {
    dispatch(cartActions.incrementItem(product));
  }
  function decHandler() {
    dispatch(cartActions.decrementItem(product));
  }
  function removeHandler() {
    dispatch(cartActions.deleteItem(product));
  }

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{ aspectRatio: 1, borderBottom: "var(--border)" }}
        image={product.image ? SERVER_URL + product.image : noImage}
        title={product.title}
        component={Link}
        to={"/products/" + product._id}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="body2"
          component="h3"
          mb={3}
          textAlign="center"
          flexGrow={1}
        >
          <Typography
            component={Link}
            color="inherit"
            fontWeight={400}
            to={"/products/" + product._id}
            sx={{ textDecoration: "none" }}
          >
            {product.title}
          </Typography>
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="success"
          fontWeight={700}
        >
          $ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        {cart.hasItem(product._id) ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={1}
          >
            <MyIconButton onClick={removeHandler} color="error">
              <Delete />
            </MyIconButton>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={0.5}
            >
              <MyIconButton color="success" onClick={incHandler}>
                <Add />
              </MyIconButton>
              <Typography>{cart.getItemCount(product._id)}</Typography>
              <MyIconButton color="error" onClick={decHandler}>
                <Remove />
              </MyIconButton>
            </Stack>
          </Stack>
        ) : (
          <Button
            onClick={incHandler}
            sx={{ width: 1, height: 43 }}
            size="large"
            disableElevation
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
