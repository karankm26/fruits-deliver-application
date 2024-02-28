function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, `${import.meta.env.VITE_SECRET_STRING}`);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
}
export { decodeToken };
