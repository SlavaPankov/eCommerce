/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/interfaces/IProduct';
import { getApiRoot, PROJECT_KEY } from '../../client/BuildClient';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';

interface IProductsState {
  loading: boolean;
  error: string;
  offset: number;
  products: Array<IProduct>;
}

const initialState: IProductsState = {
  offset: 0,
  loading: false,
  error: '',
  products: []
};

export const productsRequestAsync = createAsyncThunk('products/getProducts', async () => {
  return getApiRoot()
    .withProjectKey({ projectKey: PROJECT_KEY })
    .productProjections()
    .get()
    .execute()
    .then(({ body }): Array<IProduct> => createProductsFromResponse(body))
    .catch((error: Error) => error);
});

export const productsSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    productsLoading: (state) => {
      state.loading = true;
    },

    productsLoadingSuccess: (state, action: PayloadAction<Array<IProduct>>) => {
      state.loading = false;
      state.products = action.payload;
    },

    productsLoadingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(productsRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(productsRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.products = action.payload;
      }
    });

    builder.addCase(productsRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof Error) {
        state.error = action.payload.message;
      }
    });
  }
});

export default productsSlice.reducer;
