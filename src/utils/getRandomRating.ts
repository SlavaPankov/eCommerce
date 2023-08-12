interface IGetRandomRating {
  min?: number;
  max?: number;
}

export function getRandomRating({ min = 4, max = 5 }: IGetRandomRating): number {
  return +(Math.random() * (max - min) + min).toFixed(1);
}
