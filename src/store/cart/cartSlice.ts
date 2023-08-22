/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import { apiConfig } from '../../cfg/apiConfig';
import { ICart } from '../../types/interfaces/ICart';
import { ICartAction } from '../../types/interfaces/ICartAction';
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
      .then(({ body }): Cart => {
        return body;
      })
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
      .then(({ body }): Cart => {
        return body;
      })
      .catch((error: ErrorResponse) => {
        return rejectWithValue(error.message);
      });
  }
);

export const addLineItemRequestAsync = createAsyncThunk(
  'me/addLineItem',
  async (
    {
      cartId,
      version,
      addAction
    }: {
      cartId: string;
      version: number;
      addAction: ICartAction;
    },
    { rejectWithValue }
  ) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: addAction.action,
              productId: addAction.productId,
              variantId: addAction.variantId,
              quantity: addAction.quantity || 1
            }
          ]
        }
      })
      .execute()
      .then(({ body }) => {
        return createCartFromResponse(body);
      })
      .catch((error: ErrorResponse) => {
        return rejectWithValue(error.message);
      });
  }
);

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cart.id = action.payload.id;
      state.cart.billingAddress = action.payload.billingAddress;
      state.cart.customerId = action.payload.customerId;
      state.cart.lineItems = action.payload.lineItems;
      state.cart.totalPrice = action.payload.totalPrice;
      state.cart.shippingAddress = action.payload.shippingAddress;
      state.cart.discountCodes = action.payload.discountCode;
      state.cart.version = action.payload.version;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createCartRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createCartRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cart.id = action.payload.id;
      state.cart.version = action.payload.version;
      state.cart.customerId = action.payload.customerId;
      state.cart.lineItems = action.payload.lineItems;
      state.cart.totalPrice = action.payload.totalPrice.centAmount.toString();
      state.cart.billingAddress = action.payload.billingAddress;
      state.cart.shippingAddress = action.payload.shippingAddress;
      state.cart.discountCodes = action.payload.discountCodes;
    });

    builder.addCase(createCartRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(getActiveCartRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getActiveCartRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cart.id = action.payload.id;
      state.cart.version = action.payload.version;
      state.cart.customerId = action.payload.customerId;
      state.cart.lineItems = action.payload.lineItems;
      state.cart.totalPrice = action.payload.totalPrice.centAmount.toString();
      state.cart.billingAddress = action.payload.billingAddress;
      state.cart.shippingAddress = action.payload.shippingAddress;
      state.cart.discountCodes = action.payload.discountCodes;
    });

    builder.addCase(getActiveCartRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(addLineItemRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addLineItemRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });

    builder.addCase(addLineItemRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
  }
});

export const { setCartData } = cartSlice.actions;

export default cartSlice.reducer;
