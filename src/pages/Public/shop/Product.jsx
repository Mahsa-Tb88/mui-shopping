import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductById } from "../../../utils/queries";
import Loading from "../Loading";
import LoadingError from "../LoadingError";
import { Add, ChevronLeft, Delete, Refresh, Remove } from "@mui/icons-material";
import { cartActions } from "../../../store/slices/cartSlice";
import noImage from "../../../assets/images/no-image.jpg";
import { useDispatch, useSelector } from "react-redux";
import MyIconButton from "../../../components/Customized/MyIconButton";

export default function Product() {
  const { id } = useParams();
  const { isPending, data, error, refetch } = useProductById(id);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const product = data?.data?.body ?? {};

  function incHandler() {
    dispatch(cartActions.incrementItem(product));
  }
  function decHandler() {
    dispatch(cartActions.decrementItem(product));
  }
  function removeHandler() {
    dispatch(cartActions.deleteItem(product));
  }

  const navigate = useNavigate();
  let text, icon, handler;
  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Loading />
      </Box>
    );
  } else if (error) {
    if (error?.response?.data?.code == 404) {
      text = "Back";
      icon = <ChevronLeft />;
      handler = () => navigate("/shop");
    } else {
      text = "Try Again";
      icon = <Refresh />;
      handler = refetch;
    }
    const message = error.message;
    return (
      <Box sx={{ my: 3 }}>
        <LoadingError
          message={message}
          handleAction={handler}
          actionIcon={icon}
          actionText={text}
        />
      </Box>
    );
  }
  return (
    <Container sx={{ my: 3 }} fixed>
      <Grid2 container component={Paper} spacing={3} sx={{ p: 3 }}>
        <Grid2 size={12}>
          <Typography variant="h1" sx={{ fontWeight: 600 }}>
            {product.title}
          </Typography>
          <Divider sx={{ p: 2 }} />
        </Grid2>
        <Grid2 size={{ sx: 12, md: 9, lg: 8 }}>
          <Box
            component="img"
            // src={product.image ? product.image : noImage}
            src={noImage}
          ></Box>
        </Grid2>
        <Grid2 size={{ sx: 12, md: 3, lg: 4 }}>
          <Stack justifyContent="center" alignItems="center" height={1}>
            <Typography variant="h4" sx={{ mb:3}}>${product.price}</Typography>
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
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Divider />
        </Grid2>
        <Grid2 size={{ sx: 12 }}>
          <Typography variant="h4" sx={{ fontWeight: 200, pb: 3 }}>
            Description
          </Typography>
          <Typography>{product.description}</Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}
