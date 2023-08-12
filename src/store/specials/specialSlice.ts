/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../types/interfaces/IProduct';
import { getApiRoot, PROJECT_KEY } from '../../client/BuildClient';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';

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

export const specialsRequestAsync = createAsyncThunk('specials/getSpecials', async () => {
  return getApiRoot()
    .withProjectKey({ projectKey: PROJECT_KEY })
    .productProjections()
    .get({
      queryArgs: {
        where:
          'masterVariant(prices(discounted(discount(id="4b0c7a74-004a-499a-b884-d00a12b8a93a"))))'
      }
    })
    .execute()
    .then(({ body }): Array<IProduct> => createProductsFromResponse(body))
    .catch((error: Error) => error);
});

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
