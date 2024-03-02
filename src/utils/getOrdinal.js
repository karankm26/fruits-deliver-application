function getOrdinal(number) {
  if (/\d/.test(number)) {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = number % 10;
    const suffix =
      number >= 11 && number <= 13 ? "th" : suffixes[lastDigit] || "th";
    return number + suffix;
  } else {
    return number;
  }
}
export { getOrdinal };
