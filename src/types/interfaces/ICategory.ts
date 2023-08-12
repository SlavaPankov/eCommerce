import { ISubcategory } from './ISubcategory';

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  externalId: string | undefined;
  imageSrc: string;
  subcategories: Array<ISubcategory>;
}
