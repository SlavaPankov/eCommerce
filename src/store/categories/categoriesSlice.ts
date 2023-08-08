/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApiRoot, PROJECT_KEY } from '../../client/BuildClient';
import { ICategory } from '../../types/interfaces/ICategory';

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
    .then(({ body }) => {
      return body.results.map((category) => ({
        id: category.id,
        name: category.name.ru,
        slug: category.slug.ru,
        externalId: category.externalId
      }));
    })
    .catch((error: Error) => error.message);
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
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  }
});

export default categoriesSlice.reducer;
