/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import { apiConfig } from '../../cfg/apiConfig';

interface IDiscountCodeState {
  loading: boolean;
  error: string;
  discountCode: string;
}

const initialState: IDiscountCodeState = {
  discountCode: '',
  error: '',
  loading: false
};

export const getDiscountCodeRequestAsync = createAsyncThunk(
  'get/discountCode',
  async (token: string) => {
    return axios
      .get(`${apiConfig.baseUrl}/${apiConfig.projectKey}/discount-codes`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          where: 'name(ru="First Buy")'
        }
      })
      .then((response: AxiosResponse<DiscountCodePagedQueryResponse>) => {
        if (response.status === 200) {
          const { data } = response;
          return data.results[0].code;
        }

        throw new AxiosError(response.statusText);
      })
      .catch((error: AxiosError) => error);
  }
);

export const discountCodeSlice = createSlice({
  name: 'discountCodeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDiscountCodeRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDiscountCodeRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    builder.addCase(getDiscountCodeRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (typeof action.payload === 'string') {
        state.discountCode = action.payload;
      }

      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });
  }
});

export default discountCodeSlice.reducer;
