/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, ErrorResponse, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { apiConfig } from '../../cfg/apiConfig';
import { ICart } from '../../types/interfaces/ICart';
import { createCartFromResponse } from '../../utils/createCartFromResponse';
import { getApiRoot } from '../../client/BuildClient';

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

interface IUpdateCartPayload {
  cartId: string;
  payload: {
    version: number;
    actions: Array<MyCartUpdateAction>;
  };
}

export const createCartRequestAsync = createAsyncThunk(
  'me/createCart',
  async (arg, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .me()
      .carts()
      .post({
        body: {
          currency: 'RUB'
        }
      })
      .execute()
      .then(({ body }): ICart => createCartFromResponse(body))
      .catch((error: ErrorResponse) => {
        return rejectWithValue(error.message);
      });
  }
);

export const getActiveCartRequestAsync = createAsyncThunk(
  'me/getActiveCart',
  async (arg, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .me()
      .activeCart()
      .get()
      .execute()
      .then(({ body }): ICart => createCartFromResponse(body))
      .catch((error: ErrorResponse) => {
        return rejectWithValue(error.message);
      });
  }
);

export const updateCartRequestAsync = createAsyncThunk(
  'cart/UpdateCart',
  async (payload: IUpdateCartPayload, { rejectWithValue }) => {
    try {
      return await getApiRoot()
        .withProjectKey({ projectKey: apiConfig.projectKey })
        .me()
        .carts()
        .withId({ ID: payload.cartId })
        .post({
          body: {
            ...payload.payload
          }
        })
        .execute()
        .then(({ body }): ICart => createCartFromResponse(body))
        .catch(({ body, message }) => {
          if (body) {
            rejectWithValue(body.errors?.[0].code);
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

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCartData: (state, action: PayloadAction<Cart>) => {
      state.cart = createCartFromResponse(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createCartRequestAsync.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(createCartRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });

    builder.addCase(createCartRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(getActiveCartRequestAsync.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(getActiveCartRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });

    builder.addCase(getActiveCartRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(updateCartRequestAsync.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(updateCartRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });

    builder.addCase(updateCartRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
  }
});

export const { setCartData } = cartSlice.actions;

export default cartSlice.reducer;
