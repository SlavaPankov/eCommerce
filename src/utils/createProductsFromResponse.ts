import { ProductProjection } from '@commercetools/platform-sdk';
import { EImages } from '../types/enums/EImages';
import { IProduct } from '../types/interfaces/IProduct';
import { getFormattedPrice } from './getFormattedPrice';
import { getRandomRating } from './getRandomRating';
import { IImage } from './IImage';

export function createProductsFromResponse(results: Array<ProductProjection>): Array<IProduct> {
  const imageEmpty: IImage = {
    url: ''
  };

  return results.map((item) => ({
    id: item.id,
    name: item.name.ru,
    key: item.key || '',
    variantId: item.masterVariant.id || 0,
    images: {
      preview:
        item.masterVariant.images?.find((image) => image.label === EImages.preview) || imageEmpty,
      slider:
        item.masterVariant.images
          ?.filter((image) => image.label === EImages.slider)
          .map((filteredImage) => filteredImage) || []
    },
    attributes: item.masterVariant.attributes || [],
    categories: item.categories || [],
    price: getFormattedPrice({ price: item.masterVariant.prices?.[0].value.centAmount }),
    discountedPrice: getFormattedPrice({
      price: item.masterVariant.prices?.[0].discounted?.value.centAmount
    }),
    rating: getRandomRating({})
  }));
}
