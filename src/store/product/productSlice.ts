/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../types/interfaces/IProduct';
import { getApiRoot } from '../../client/BuildClient';
import { apiConfig } from '../../cfg/apiConfig';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';

interface IProductState {
  loading: boolean;
  error: string;
  product: IProduct;
}

const initialState: IProductState = {
  loading: false,
  error: '',
  product: {
    id: '',
    name: '',
    key: '',
    variantId: 0,
    categories: [],
    attributes: [],
    price: '',
    discountedPrice: '',
    rating: 0,
    description: ''
  }
};

export const getProductByKeyAsyncRequest = createAsyncThunk(
  'product/getProductByKey',
  async (key: string, { rejectWithValue }) => {
    try {
      return await getApiRoot()
        .withProjectKey({ projectKey: apiConfig.projectKey })
        .productProjections()
        .withKey({ key })
        .get()
        .execute()
        .then(({ body }) => {
          const [result] = [...createProductsFromResponse([body])];
          return result;
        })
        .catch(({ body, message }) => {
          if (body) {
            return rejectWithValue(body.errors?.[0].code);
          }

          throw new Error(message);
        });
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductByKeyAsyncRequest.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getProductByKeyAsyncRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
    builder.addCase(getProductByKeyAsyncRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
  }
});

export default productSlice.reducer;
