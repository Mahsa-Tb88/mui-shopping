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
    setSearchParams(params, { replace: true });
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
            <MenuItem value={c.slug} key={c.slugs}>
              {c.title}
            </MenuItem>
          );
        })}
      </TextField>
    </Stack>
  );
}
