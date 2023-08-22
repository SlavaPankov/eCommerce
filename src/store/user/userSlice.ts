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
    lastName: ''
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
  async (payload: ILoginData, thunkAPI) => {
    tokenCache.set({ token: '', expirationTime: 0 });
    process.env.USERNAME = payload.email;
    process.env.PASSWORD = payload.password;

    return getApiRoot()
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
      state.user.addresses = action.payload.customer.addresses;

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
      state.user.id = action.payload.customer.id;
      state.user.firstName = action.payload.customer.firstName || '';
      state.user.lastName = action.payload.customer.lastName || '';
      state.user.email = action.payload.customer.email;
      state.user.addresses = action.payload.customer.addresses;
    });

    builder.addCase(userSignInRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
  }
});

export default userSlice.reducer;
