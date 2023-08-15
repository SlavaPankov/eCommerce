/* eslint-disable no-param-reassign */
import { BaseAddress } from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ICustomerDraft } from '../../types/interfaces/ICustomerDraft';
import { apiConfig } from '../../cfg/apiConfig';
import { ILoginData } from '../../types/interfaces/ILoginData';

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

interface IUserSignUpRequestAsync {
  token: string;
  data: ICustomerDraft;
}

interface IUserSignInRequestAsync {
  token: string;
  data: ILoginData;
}

export const userSignUpRequestAsync = createAsyncThunk(
  'me/Signup',
  async (payload: IUserSignUpRequestAsync, thunkAPI) => {
    return axios
      .post(
        `${apiConfig.baseUrl}/${apiConfig.projectKey}/customers`,
        {
          ...payload.data
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          return response.data;
        }

        return thunkAPI.rejectWithValue(initialState.user);
      })
      .catch((error: AxiosError) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);

export const userSignInRequestAsync = createAsyncThunk(
  'me/SignIn',
  async (payload: IUserSignInRequestAsync, thunkAPI) => {
    return axios
      .post(
        `${apiConfig.baseUrl}/${apiConfig.projectKey}/login`,
        {
          ...payload.data
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }

        return thunkAPI.rejectWithValue(initialState.user);
      })
      .catch((error: AxiosError) => {
        return thunkAPI.rejectWithValue(error);
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
      if (!(action.payload instanceof AxiosError)) {
        state.user.id = action.payload.customer.id;
        state.user.firstName = action.payload.customer.firstName;
        state.user.lastName = action.payload.customer.lastName;
        state.user.email = action.payload.customer.email;
        state.user.addresses = action.payload.customer.addresses;
      }
    });

    builder.addCase(userSignUpRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data.errors[0].code;
      }
    });

    builder.addCase(userSignInRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userSignInRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (!(action.payload instanceof AxiosError)) {
        state.user.id = action.payload.customer.id;
        state.user.firstName = action.payload.customer.firstName;
        state.user.lastName = action.payload.customer.lastName;
        state.user.email = action.payload.customer.email;
        state.user.addresses = action.payload.customer.addresses;
      }
    });

    builder.addCase(userSignInRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data.errors[0].code;
      }
    });
  }
});

export default userSlice.reducer;
