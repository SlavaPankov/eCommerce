import { LineItem } from '@commercetools/platform-sdk';
import { ILineItem } from '../types/interfaces/ILineItem';
import { getFormattedPrice } from './getFormattedPrice';
import { EImages } from '../types/enums/EImages';
import { IImage } from '../types/interfaces/IImage';

export function createLineItem(item: LineItem): ILineItem {
  const imageEmpty: IImage = {
    url: ''
  };

  return {
    discountedPrice: getFormattedPrice({ price: item.price.discounted?.value.centAmount }),
    id: item.id,
    images: {
      preview: item.variant.images?.find((image) => image.label === EImages.preview) || imageEmpty,
      slider:
        item.variant.images
          ?.filter((image) => image.label === EImages.slider)
          .map((filteredImage) => filteredImage) || []
    },
    key: item.productKey || '',
    name: item.name.ru,
    price: getFormattedPrice({ price: item.price.value.centAmount }),
    quantity: item.quantity
  };
}
