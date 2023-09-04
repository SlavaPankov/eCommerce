/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, ErrorResponse } from '@commercetools/platform-sdk';
import { ICategory } from '../../types/interfaces/ICategory';
import { getCategoriesImages } from '../../utils/getCategoriesImages';
import noImage from '../../assets/images/noPhoto.png';
import { ISubcategory } from '../../types/interfaces/ISubcategory';
import { apiConfig } from '../../cfg/apiConfig';
import { getApiRoot } from '../../client/BuildClient';

interface ICategoriesState {
  loading: boolean;
  error: string;
  categories: Array<ICategory>;
}

const initialState: ICategoriesState = {
  loading: false,
  error: '',
  categories: []
};

export const categoriesAsyncRequest = createAsyncThunk(
  'categories/getCategories',
  async (arg, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .categories()
      .get()
      .execute()
      .then(({ body: { results } }): Array<ICategory> => {
        const categories: Array<ICategory> = results
          .filter((item: Category) => !item.parent)
          .map((category: Category, index: number) => ({
            id: category.id,
            name: category.name.ru,
            slug: category.slug.ru,
            externalId: category.externalId,
            imageSrc: getCategoriesImages()[index] || noImage,
            subcategories: []
          }));
        const subcategories: Array<ISubcategory> = results
          .filter((item: Category) => item.parent)
          .map((category: Category) => ({
            id: category.id,
            parentId: category.parent?.id || '',
            name: category.name.ru,
            slug: category.slug.ru,
            externalId: category.externalId
          }));

        for (let i = 0; i < categories.length; i += 1) {
          for (let j = 0; j < subcategories.length; j += 1) {
            if (subcategories[j].parentId === categories[i].id) {
              categories[i].subcategories.push(subcategories[j]);
            }
          }
        }

        return categories;
      })
      .catch((error: ErrorResponse) => {
        return rejectWithValue(error.message);
      });
  }
);

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoriesAsyncRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(categoriesAsyncRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (typeof action.payload === 'object') {
        state.categories = action.payload;
      }
    });

    builder.addCase(categoriesAsyncRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
  }
});

export default categoriesSlice.reducer;
