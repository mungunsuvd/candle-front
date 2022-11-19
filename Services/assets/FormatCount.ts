export const FormatCount = (price: number) => {
  if (price >= 1000 && price < 1000000) return (price / 1000).toFixed(1) + "K";
  else if (price >= 1000000) return (price / 1000000).toFixed(1) + "M";

  return price;
};

export const CurrencyFormatter = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};
