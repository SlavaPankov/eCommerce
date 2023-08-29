/* eslint-disable no-param-reassign */
import { BaseAddress, ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICustomerDraft } from '../../types/interfaces/ICustomerDraft';
import { apiConfig } from '../../cfg/apiConfig';
import { ILoginData } from '../../types/interfaces/ILoginData';
import { getApiRoot, tokenCache } from '../../client/BuildClient';

interface IUser {
  id: string;
  addresses: Array<BaseAddress>;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: Array<string>;
  billingAddressIds: Array<string>;
  version: number;
}

interface IUserState {
  loading: boolean;
  error: string;
  user: IUser;
}

const initialState: IUserState = {
  loading: false,
  error: '',
  user: {
    id: '',
    addresses: [],
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(0).toLocaleDateString(),
    defaultShippingAddressId: '',
    defaultBillingAddressId: '',
    shippingAddressIds: [],
    billingAddressIds: [],
    version: 0
  }
};

export const userSignUpRequestAsync = createAsyncThunk<
  CustomerSignInResult,
  ICustomerDraft,
  { rejectValue: string }
>('me/Signup', async (payload: ICustomerDraft, thunkAPI) => {
  const response = await getApiRoot()
    .withProjectKey({ projectKey: apiConfig.projectKey })
    .customers()
    .post({
      body: {
        ...payload
      }
    })
    .execute()
    .then(({ body: { customer, cart } }): CustomerSignInResult => {
      return {
        customer,
        cart
      };
    })
    .catch(({ body }) => {
      return thunkAPI.rejectWithValue(body.errors?.[0].code);
    });

  return response;
});

export const userSignInRequestAsync = createAsyncThunk(
  'me/SignIn',
  // eslint-disable-next-line consistent-return
  async (payload: ILoginData, thunkAPI) => {
    tokenCache.set({ token: '', expirationTime: 0 });
    process.env.USERNAME = payload.email;
    process.env.PASSWORD = payload.password;

    try {
      return await getApiRoot()
        .withProjectKey({ projectKey: apiConfig.projectKey })
        .me()
        .login()
        .post({
          body: {
            ...payload
          }
        })
        .execute()
        .then(
          ({
            body: { customer, cart }
          }: ClientResponse<CustomerSignInResult>): CustomerSignInResult => {
            return {
              customer,
              cart
            };
          }
        )
        .catch(({ body }) => {
          return thunkAPI.rejectWithValue(body.errors?.[0].code);
        });
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMeRequestAsync = createAsyncThunk(
  'me/GetUser',
  async (args, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .me()
      .get()
      .execute()
      .then(({ body }) => body)
      .catch(({ body }) => rejectWithValue(body.errors?.[0].code));
  }
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignUpRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userSignUpRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user.id = action.payload.customer.id;
      state.user.firstName = action.payload.customer.firstName || '';
      state.user.lastName = action.payload.customer.lastName || '';
      state.user.email = action.payload.customer.email;
      state.user.dateOfBirth =
        action.payload.customer.dateOfBirth || new Date(0).toLocaleDateString();
      state.user.addresses = action.payload.customer.addresses;
      state.user.defaultShippingAddressId = action.payload.customer.defaultShippingAddressId || '';
      state.user.defaultBillingAddressId = action.payload.customer.defaultBillingAddressId || '';
      state.user.shippingAddressIds = action.payload.customer.shippingAddressIds || [];
      state.user.billingAddressIds = action.payload.customer.billingAddressIds || [];
      state.user.version = action.payload.customer.version;

      tokenCache.set({
        token: '',
        expirationTime: 0
      });
    });

    builder.addCase(userSignUpRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(userSignInRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userSignInRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.user.id = action.payload.customer.id;
        state.user.firstName = action.payload.customer.firstName || '';
        state.user.lastName = action.payload.customer.lastName || '';
        state.user.email = action.payload.customer.email;
        state.user.dateOfBirth =
          action.payload.customer.dateOfBirth || new Date(0).toLocaleDateString();
        state.user.addresses = action.payload.customer.addresses;
        state.user.defaultShippingAddressId =
          action.payload.customer.defaultShippingAddressId || '';
        state.user.defaultBillingAddressId = action.payload.customer.defaultBillingAddressId || '';
        state.user.shippingAddressIds = action.payload.customer.shippingAddressIds || [];
        state.user.billingAddressIds = action.payload.customer.billingAddressIds || [];
        state.user.version = action.payload.customer.version;
      }
    });

    builder.addCase(userSignInRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(getMeRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getMeRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user.id = action.payload.id;
      state.user.firstName = action.payload.firstName || '';
      state.user.lastName = action.payload.lastName || '';
      state.user.email = action.payload.email;
      state.user.dateOfBirth = action.payload.dateOfBirth || new Date(0).toLocaleDateString();
      state.user.addresses = action.payload.addresses;
      state.user.defaultShippingAddressId = action.payload.defaultShippingAddressId || '';
      state.user.defaultBillingAddressId = action.payload.defaultBillingAddressId || '';
      state.user.shippingAddressIds = action.payload.shippingAddressIds || [];
      state.user.billingAddressIds = action.payload.billingAddressIds || [];
      state.user.version = action.payload.version;
    });

    builder.addCase(getMeRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
  }
});

export default userSlice.reducer;
