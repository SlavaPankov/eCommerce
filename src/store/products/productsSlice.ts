/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/interfaces/IProduct';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';
import { apiConfig } from '../../cfg/apiConfig';
import { getApiRoot } from '../../client/BuildClient';

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

interface IProductsRequestProps {
  offset: number;
}

export const productsRequestAsync = createAsyncThunk(
  'products/getProducts',
  async ({ offset }: IProductsRequestProps, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .productProjections()
      .get({
        queryArgs: {
          offset
        }
      })
      .execute()
      .then(({ body: { results } }): Array<IProduct> => createProductsFromResponse(results))
      .catch((error: Error) => {
        return rejectWithValue(error.message);
      });
  }
);

export const productsSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    productsLoading: (state) => {
      state.loading = true;
    },

    productsLoadingSuccess: (state, action: PayloadAction<Array<IProduct>>) => {
      console.log(action.payload);
      state.loading = false;
      state.products = action.payload;
    },

    productsLoadingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    setOffset: (state, action: PayloadAction<number>) => {
      state.offset += action.payload;
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
      state.error = `${action.payload}`;
    });
  }
});

export const { setOffset } = productsSlice.actions;

export default productsSlice.reducer;
