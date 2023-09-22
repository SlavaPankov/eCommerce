interface IGetFormattedPrice {
  price: number | undefined;
  fractionDigits?: number;
}

export function getFormattedPrice({ price, fractionDigits = 2 }: IGetFormattedPrice): string {
  if (!price) {
    return '';
  }
  const priceString = price.toString();

  return Number(priceString.slice(0, priceString.length - fractionDigits)).toLocaleString('ru-RU');
}
