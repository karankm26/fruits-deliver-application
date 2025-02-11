import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
export default function Loader({ isLoading }) {
  return isLoading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : null;
}
