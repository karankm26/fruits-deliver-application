import React from "react";
import { createRoot } from "react-dom/client";
import { startTransition } from "react";
import SnackBar from "./snackBar";

export const snack = {
  success: (message) => {
    showSnackbar(message, "success");
  },
  error: (message) => {
    showSnackbar(message, "error");
  },
  warning: (message) => {
    showSnackbar(message, "warning");
  },
};

const showSnackbar = (message, type) => {
  const snackbarContainer = document.createElement("div");
  document.body.appendChild(snackbarContainer);
  const root = createRoot(snackbarContainer);
  
  startTransition(() => {
    root.render(<SnackBar message={message} type={type} />);
  });

  setTimeout(() => {
    root.unmount(); 
    document.body.removeChild(snackbarContainer);
  }, 3000);
};
