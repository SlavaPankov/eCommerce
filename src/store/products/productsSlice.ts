/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../types/interfaces/IProduct';
import { getApiRoot, PROJECT_KEY } from '../../client/BuildClient';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';
import { apiConfig } from '../../cfg/apiConfig';

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

export const productsRequestAsyncOld = createAsyncThunk(
  'products/getProducts',
  async ({ offset }: { offset: number }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: PROJECT_KEY })
      .productProjections()
      .get({
        queryArgs: {
          limit: 24,
          offset
        }
      })
      .execute()
      .then(({ body }): Array<IProduct> => createProductsFromResponse(body))
      .catch((error: Error) => error);
  }
);

interface IProductsRequestProps {
  offset: number;
  token: string;
}

export const productsRequestAsync = createAsyncThunk(
  'products/getProducts',
  async ({ offset, token }: IProductsRequestProps) => {
    return axios
      .get(`${apiConfig.baseUrl}/${apiConfig.projectKey}/product-projections`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 24,
          offset
        }
      })
      .then(({ data }): Array<IProduct> => createProductsFromResponse(data))
      .catch((error: Error) => error);
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
        state.products.push(...action.payload);
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

export const { setOffset } = productsSlice.actions;

export default productsSlice.reducer;
