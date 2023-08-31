/* eslint-disable no-param-reassign */
import {
  BaseAddress,
  Cart,
  ClientResponse,
  CustomerSignInResult,
  MyCustomerChangePassword,
  MyCustomerUpdate
} from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomerDraft } from '../../types/interfaces/ICustomerDraft';
import { apiConfig } from '../../cfg/apiConfig';
import { ILoginData } from '../../types/interfaces/ILoginData';
import { getApiRoot, tokenCache } from '../../client/BuildClient';
import { getCustomerFromResponse } from '../../utils/getCustomerFromResponse';

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

interface ISungUpResponse {
  customer: IUser;
  cart: Cart | undefined;
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
  ISungUpResponse,
  ICustomerDraft,
  { rejectValue: string }
>('me/Signup', async (payload: ICustomerDraft, { rejectWithValue }) => {
  try {
    return await getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .customers()
      .post({
        body: {
          ...payload
        }
      })
      .execute()
      .then(({ body: { customer, cart } }): ISungUpResponse => {
        return {
          customer: getCustomerFromResponse(customer),
          cart
        };
      })
      .catch(({ body }) => {
        return rejectWithValue(body.errors?.[0].code);
      });
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const userSignInRequestAsync = createAsyncThunk<
  ISungUpResponse,
  ILoginData,
  { rejectValue: string }
>('me/SignIn', async (payload: ILoginData, { rejectWithValue }) => {
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
        ({ body: { customer, cart } }: ClientResponse<CustomerSignInResult>): ISungUpResponse => {
          return {
            customer: getCustomerFromResponse(customer),
            cart
          };
        }
      )
      .catch(({ body }) => {
        return rejectWithValue(body.errors?.[0].code);
      });
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const getMeRequestAsync = createAsyncThunk(
  'me/GetUser',
  async (args, { rejectWithValue }) => {
    try {
      return await getApiRoot()
        .withProjectKey({ projectKey: apiConfig.projectKey })
        .me()
        .get()
        .execute()
        .then(({ body }) => getCustomerFromResponse(body))
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

export const updateMeRequestAsync = createAsyncThunk(
  'me/UpdateMe',
  async (payload: MyCustomerUpdate, { rejectWithValue }) => {
    try {
      return await getApiRoot()
        .withProjectKey({ projectKey: apiConfig.projectKey })
        .me()
        .post({ body: { ...payload } })
        .execute()
        .then(({ body }) => getCustomerFromResponse(body))
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

export const changePasswordRequestAsync = createAsyncThunk(
  'me/ChangePassword',
  async (payload: MyCustomerChangePassword, { rejectWithValue }) => {
    try {
      return await getApiRoot()
        .withProjectKey({ projectKey: apiConfig.projectKey })
        .me()
        .password()
        .post({
          body: {
            ...payload
          }
        })
        .execute()
        .then(({ body }) => getCustomerFromResponse(body))
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

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    removeAddress: (state, action: PayloadAction<string>) => {
      state.user.addresses = state.user.addresses.filter(
        (address) => address.id !== action.payload
      );
    },

    addAddress: (state, action: PayloadAction<string>) => {
      state.user.addresses.push({
        id: action.payload,
        streetName: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
        building: '',
        apartment: ''
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userSignUpRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userSignUpRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.user = action.payload.customer;

      tokenCache.set({
        token: '',
        expirationTime: 0
      });
    });

    builder.addCase(userSignUpRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = '';
      state.error = `${action.payload}`;
    });

    builder.addCase(userSignInRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userSignInRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.user = action.payload.customer;
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
      state.error = '';
      state.user = action.payload;
    });

    builder.addCase(getMeRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(updateMeRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateMeRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.user = action.payload;
    });

    builder.addCase(updateMeRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(changePasswordRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(changePasswordRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.user = action.payload;
    });

    builder.addCase(changePasswordRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
  }
});

export const { removeAddress, addAddress } = userSlice.actions;

export default userSlice.reducer;
