import React from "react";
import ErrorPermission from "./Pages/error/errorPermission";

export default function Permission({ children, permission }) {
  return permission
    ? children
    : permission !== undefined && <ErrorPermission />;
}
