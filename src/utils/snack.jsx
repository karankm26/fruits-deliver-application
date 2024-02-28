import React from "react";
import ReactDOM from "react-dom";
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
  startTransition(() => {
    ReactDOM.render(
      <SnackBar message={message} type={type} />,
      snackbarContainer
    );
  });
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(snackbarContainer);
    document.body.removeChild(snackbarContainer);
  }, 3000);
};
