import { Container, Divider, Grid2, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CartTable from "../../components/CartTable";
import LoadingError from "./LoadingError";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  document.title="Cart"
  
  return (
    <Container sx={{ mt: 4 }}>
      <Grid2 container>
        <Grid2 size={12}>
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            fontWeight={400}
          >
            Shopping Cart
          </Typography>
          <Divider sx={{ my: 2 }} />
          {cart.itemsCount() > 0 ? (
            <Paper
              elevation={0}
              sx={{ overflow: "auto", border: "var(--borer)", mb: 6 }}
            >
              <CartTable />
            </Paper>
          ) : (
            <LoadingError
              message="your cart is empty!"
              handleAction={() => navigate("/shop")}
              actionIcon=<ChevronLeft />
              actionText="Back to shop"
            />
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}
