/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@commercetools/platform-sdk';
import { apiConfig } from '../../cfg/apiConfig';
import { getApiRoot } from '../../client/BuildClient';

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
  async (arg, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .discountCodes()
      .get({
        queryArgs: {
          where: 'name(ru="First Buy")'
        }
      })
      .execute()
      .then(({ body: { results } }): string => {
        return results[0].code;
      })
      .catch((error: ErrorResponse) => {
        return rejectWithValue(error.message);
      });
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
      state.error = `${action.payload}`;
    });

    builder.addCase(getDiscountCodeRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.discountCode = action.payload;
    });
  }
});

export default discountCodeSlice.reducer;
