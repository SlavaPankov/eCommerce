import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { EImages } from '../types/enums/EImages';
import { IProduct } from '../types/interfaces/IProduct';
import { getFormattedPrice } from './getFormattedPrice';

export function createProductsFromResponse(
  body: ProductProjectionPagedQueryResponse
): Array<IProduct> {
  return body.results.map((item) => ({
    id: item.id,
    name: item.name.ru,
    key: item.key || '',
    images: {
      preview:
        item.masterVariant.images?.find((image) => image.label === EImages.preview)?.url || '',
      slider:
        item.masterVariant.images
          ?.filter((image) => image.label === EImages.slider)
          .map((filteredImage) => filteredImage.url) || []
    },
    attributes: item.masterVariant.attributes || [],
    categories: item.categories || [],
    price: getFormattedPrice({ price: item.masterVariant.prices?.[0].value.centAmount }),
    discountedPrice: getFormattedPrice({
      price: item.masterVariant.prices?.[0].discounted?.value.centAmount
    })
  }));
}
