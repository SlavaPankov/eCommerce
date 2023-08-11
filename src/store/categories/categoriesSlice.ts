/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApiRoot, PROJECT_KEY } from '../../client/BuildClient';
import { ICategory } from '../../types/interfaces/ICategory';
import { getCategoriesImages } from '../../utils/getCategoriesImages';
import noImage from '../../assets/images/noPhoto.png';
import { ISubcategory } from '../../types/interfaces/ISubcategory';

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

export const categoriesAsyncRequest = createAsyncThunk('categories/getCategories', async () => {
  return getApiRoot()
    .withProjectKey({ projectKey: PROJECT_KEY })
    .categories()
    .get()
    .execute()
    .then(({ body }): Array<ICategory> => {
      const categories: Array<ICategory> = body.results
        .filter((item) => !item.parent)
        .map((category, index) => ({
          id: category.id,
          name: category.name.ru,
          slug: category.slug.ru,
          externalId: category.externalId,
          imageSrc: getCategoriesImages()[index] || noImage,
          subcategories: []
        }));
      const subcategories: Array<ISubcategory> = body.results
        .filter((item) => item.parent)
        .map((category) => ({
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

      console.log(categories);

      return categories;
    })
    .catch((error: Error) => error);
});

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    categoriesLoading: (state) => {
      state.loading = true;
    },

    categoriesLoadingSuccess: (state, action: PayloadAction<Array<ICategory>>) => {
      state.loading = false;
      state.categories = action.payload;
    },

    categoriesLoadingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(categoriesAsyncRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(categoriesAsyncRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.categories = action.payload;
      }
    });

    builder.addCase(categoriesAsyncRequest.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof Error) {
        state.error = action.payload.message;
      }
    });
  }
});

export default categoriesSlice.reducer;
