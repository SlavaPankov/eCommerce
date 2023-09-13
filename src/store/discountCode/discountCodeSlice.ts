/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
      .catch(({ body }) => rejectWithValue(body.errors?.[0].code));
  }
);

export const getDiscountCodeByIdRequestAsync = createAsyncThunk(
  'get/DiscountCodeById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await getApiRoot()
        .withProjectKey({ projectKey: apiConfig.projectKey })
        .discountCodes()
        .withId({ ID: id })
        .get()
        .execute()
        .then(({ body }): string => {
          return body.code;
        })
        .catch(({ body }) => rejectWithValue(body.errors?.[0].code));
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
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

    builder.addCase(getDiscountCodeByIdRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDiscountCodeByIdRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(getDiscountCodeByIdRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.discountCode = action.payload;
    });
  }
});

export default discountCodeSlice.reducer;
