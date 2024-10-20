import React from "react";
import MyTable from "./Customized/MyTable";
import {
  Stack,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../assets/images/no-image.jpg";
import { Add, Delete, Remove } from "@mui/icons-material";
import MyIconButton from "./Customized/MyIconButton";
import { Link } from "react-router-dom";
import { cartActions } from "../store/slices/cartSlice";

export default function CartTable() {
  const cart = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  function incHandler(product) {
    dispatch(cartActions.incrementItem(product));
  }
  function decHandler(product) {
    dispatch(cartActions.decrementItem(product));
  }
  function removeHandler(product) {
    dispatch(cartActions.deleteItem(product));
  }
  return (
    <MyTable>
      <TableHead>
        <TableRow>
          <TableCell component="th" width={50}>
            Row
          </TableCell>
          <TableCell component="th" width={90}>
            Image
          </TableCell>
          <TableCell component="th" width={140}>
            Title
          </TableCell>
          <TableCell component="th" width={110}>
            Price
          </TableCell>
          <TableCell component="th" width={130}>
            Total Price
          </TableCell>
          <TableCell component="th" width={90}>
            Operation
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cart.items.map((p, i) => {
          return (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell sx={{}}>
                <Link
                  to={"/products/" + p._id}
                  style={{
                    border: "var(--border)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    borderRadius: 4,
                    overflow: "hidden",
                    width: 60,
                    height: 60,
                  }}
                >
                  <img
                    src={!p.image ? SERVER_URL + p.image : noImage}
                    style={{ AspectRatio: 1, width: "100%", display: "block" }}
                  />
                </Link>
              </TableCell>
              <TableCell>
                <Typography
                  component={Link}
                  to={"products" + p._id}
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    fontSize: { xs: 14, md: 15, lg: 16 },
                    "&:hover": {
                      textDecoration: "underline",
                      coloe: "text.secondary",
                    },
                  }}
                >
                  {p.title}
                </Typography>
              </TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.price + p.count}</TableCell>
              <TableCell>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={1}
                >
                  <MyIconButton onClick={() => removeHandler(p)} color="error">
                    <Delete />
                  </MyIconButton>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MyIconButton color="success" onClick={() => incHandler(p)}>
                      <Add />
                    </MyIconButton>
                    <Typography>{cart.getItemCount(p._id)}</Typography>
                    <MyIconButton color="error" onClick={() => decHandler(p)}>
                      <Remove />
                    </MyIconButton>
                  </Stack>
                </Stack>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow
          sx={{
            "& td": {
              color: theme === "dark" ? "white" : "black",
              fontSize: 18,
              fontWeight: 600,
            },
          }}
        >
          <TableCell colSpan={4}></TableCell>
          <TableCell>Total</TableCell>
          <TableCell colSpan={2}>${cart.getTotalPrice()}</TableCell>
        </TableRow>
      </TableFooter>
    </MyTable>
  );
}
