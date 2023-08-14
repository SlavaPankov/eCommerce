/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiConfig } from '../../cfg/apiConfig';
import { ICart } from '../../types/interfaces/ICart';
import { ICartAction } from '../../types/interfaces/ICartAction';
import { createCartFromResponse } from '../../utils/createCartFromResponse';

interface ICartState {
  loading: boolean;
  error: string;
  cart: ICart;
}

const initialState: ICartState = {
  loading: false,
  error: '',
  cart: {
    id: '',
    customerId: '',
    lineItems: [],
    totalPrice: '',
    billingAddress: { country: '' },
    shippingAddress: { country: '' },
    discountCodes: [],
    version: 0
  }
};

export const createCartRequestAsync = createAsyncThunk('me/createCart', async (token: string) => {
  return axios
    .post(
      `${apiConfig.baseUrl}/${apiConfig.projectKey}/me/carts`,
      {
        currency: 'RUB'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        const { data } = response;
        return createCartFromResponse(data);
      }

      return response.data;
    })
    .catch((error: AxiosError) => error);
});

export const getActiveCartRequestAsync = createAsyncThunk(
  'me/getActiveCart',
  async (token: string) => {
    return axios
      .get(`${apiConfig.baseUrl}/${apiConfig.projectKey}/me/active-cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const { data } = response;
          return createCartFromResponse(data);
        }

        return response.data;
      })
      .catch((error: AxiosError) => error);
  }
);

export const addLineItemRequestAsync = createAsyncThunk(
  'me/addLineItem',
  async ({
    token,
    cartId,
    version,
    addAction
  }: {
    token: string;
    cartId: string;
    version: number;
    addAction: ICartAction;
  }) => {
    return axios
      .post(
        `${apiConfig.baseUrl}/${apiConfig.projectKey}/me/carts/${cartId}`,
        {
          version,
          actions: [
            {
              action: addAction.action,
              productId: addAction.productId,
              variantId: addAction.variantId,
              quantity: addAction.quantity || 1
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const { data } = response;
          return createCartFromResponse(data);
        }

        return response.data;
      })
      .catch((error: AxiosError) => error);
  }
);

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCartRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createCartRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (!(action.payload instanceof AxiosError)) {
        state.cart = action.payload;
      } else {
        state.error = action.payload.message;
      }
    });

    builder.addCase(createCartRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    builder.addCase(getActiveCartRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getActiveCartRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (!(action.payload instanceof AxiosError)) {
        state.cart = action.payload;
      } else {
        state.error = action.payload.message;
      }
    });

    builder.addCase(getActiveCartRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    builder.addCase(addLineItemRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addLineItemRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (!(action.payload instanceof AxiosError)) {
        state.cart = action.payload;
      } else {
        state.error = action.payload.message;
      }
    });

    builder.addCase(addLineItemRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });
  }
});

export default cartSlice.reducer;
