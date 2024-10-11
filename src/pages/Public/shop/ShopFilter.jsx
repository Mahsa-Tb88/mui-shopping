import { SearchTwoTone } from "@mui/icons-material";
import { MenuItem, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ShopFilter() {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((state) => state.app.categories);
  const shop = useSelector((state) => state.shop);
  console.log(shop);

  function handleSearch() {
    const params = getNewSearchParams(searchParams, "q", search);
    delete params.page;
    setSearchParams(params, { replace: true });
  }
  useEffect(() => {
    const serachTimeOut = setTimeout(handleSearch, 1000);
    return () => clearTimeout(serachTimeOut);
  }, [search]);

  function categoryHandler(e) {
    const params = getNewSearchParams(searchParams, "category", e.target.value);
    delete params.page;
    setSearchParams(params);
  }

  function getSortType() {
    if (shop.sort === "_id" && shop.order === "desc") {
      return "1";
    } else if (shop.sort === "_id" && shop.order === "asc") {
      return "2";
    } else if (shop.sort === "price" && shop.order === "desc") {
      return "3";
    } else if (shop.sort === "price" && shop.order === "asc") {
      return "4";
    }
  }

  function sortHandler(e) {
    const type = e.target.value;
    const s = { sort: "_id", order: "desc" };
    if (type === "2") {
      s.order = "asc";
    } else if (type === "3") {
      s.sort = "price";
    } else if (type === "4") {
      s.sort = "price";
      s.order = "asc";
    }
    let params = getNewSearchParams(
      searchParams,
      "sort",
      s.sort === "price" ? "price" : ""
    );
    params = getNewSearchParams(
      params,
      "order",
      s.order === "asc" ? "asc" : ""
    );
    delete params.page;
    setSearchParams(params);
  }

  function limitHandle(e) {
    const params = getNewSearchParams(
      searchParams,
      "limit",
      e.target.value === "6" ? "" : e.target.value
    );
    delete params.page;
    setSearchParams(params);
  }
  return (
    <Stack spacing={3}>
      <TextField
        size="small"
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TextField
        select
        size="small"
        label={shop.category ? "category" : ""}
        value={shop.category}
        onChange={categoryHandler}
        slotProps={{ select: { displayEmpty: true } }}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((c) => {
          return (
            <MenuItem value={c.slug} key={c.slug}>
              {c.title}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        select
        size="small"
        label="Sort"
        value={getSortType()}
        onChange={sortHandler}
      >
        <MenuItem value="1">Newest</MenuItem>
        <MenuItem value="2">Oldest</MenuItem>
        <MenuItem value="3">The Most Expensive</MenuItem>
        <MenuItem value="4">CHeapest</MenuItem>
      </TextField>
      <TextField
        select
        size="small"
        label="Limit"
        value={shop.limit}
        onChange={limitHandle}
      >
        <MenuItem value="6">{6}</MenuItem>
        <MenuItem value="9">{9}</MenuItem>
        <MenuItem value="12">{12}</MenuItem>
        <MenuItem value="24">{24}</MenuItem>
      </TextField>
    </Stack>
  );
}
