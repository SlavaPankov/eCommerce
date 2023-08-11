/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../types/interfaces/IProduct';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';
import { apiConfig } from '../../cfg/apiConfig';

interface ISpecialsState {
  loading: boolean;
  error: string;
  payload: Array<IProduct>;
}

const initialState: ISpecialsState = {
  loading: false,
  error: '',
  payload: []
};

export const specialsRequestAsync = createAsyncThunk(
  'specials/getSpecials',
  async (token: string) => {
    return axios
      .get(`${apiConfig.baseUrl}/${apiConfig.projectKey}/product-projections`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          where:
            'masterVariant(prices(discounted(discount(id="4b0c7a74-004a-499a-b884-d00a12b8a93a"))))'
        }
      })
      .then(({ data }): Array<IProduct> => createProductsFromResponse(data))
      .catch((error: Error) => error);
  }
);

export const specialsSlice = createSlice({
  name: 'specialsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(specialsRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(specialsRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.payload = action.payload;
      }
    });

    builder.addCase(specialsRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof Error) {
        state.error = action.payload.message;
      }
    });
  }
});

export default specialsSlice.reducer;
