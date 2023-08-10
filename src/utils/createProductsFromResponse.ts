import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { EImages } from '../types/enums/EImages';
import { IProduct } from '../types/interfaces/IProduct';

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
    price: item.masterVariant.price?.value.centAmount || 0,
    discountedPrice: item.masterVariant.price?.discounted?.value.centAmount || 0
  }));
}
