/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '@commercetools/platform-sdk';
import { IProduct } from '../../types/interfaces/IProduct';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';
import { apiConfig } from '../../cfg/apiConfig';
import { getApiRoot } from '../../client/BuildClient';

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
  async (arg, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .productProjections()
      .get({
        queryArgs: {
          where:
            'masterVariant(prices(discounted(discount(id="4b0c7a74-004a-499a-b884-d00a12b8a93a"))))'
        }
      })
      .execute()
      .then(({ body: { results } }): Array<IProduct> => createProductsFromResponse(results))
      .catch((error: ErrorResponse) => {
        return rejectWithValue(error.message);
      });
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
      state.error = `${action.payload}`;
    });
  }
});

export default specialsSlice.reducer;
