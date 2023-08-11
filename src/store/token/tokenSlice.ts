/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiConfig } from '../../cfg/apiConfig';

interface IToken {
  token: string;
  expires_in: number;
}

interface ITokenState {
  loading: boolean;
  error: string;
  payload: IToken;
}

const initialState: ITokenState = {
  loading: false,
  error: '',
  payload: {
    token: '',
    expires_in: 0
  }
};

export const tokenRequestAsync = createAsyncThunk('token/getToken', async () => {
  return axios
    .post(
      `${apiConfig.authUrl}/oauth/${apiConfig.projectKey}/anonymous/token`,
      {
        grant_type: 'client_credentials',
        scope: apiConfig.scope
      },
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: process.env.CLIENT_ID || '',
          password: process.env.SECRET || ''
        }
      }
    )
    .then(({ data }): IToken => {
      console.log(data);
      return {
        token: data.access_token,
        expires_in: data.expires_in
      };
    })
    .catch((error: AxiosError) => error.message);
});

export const saveToken = createAsyncThunk('token/saveToken', () => {
  const token = localStorage.getItem('token');
  const expiresIn = localStorage.getItem('expires_in');
  if (token && expiresIn) {
    return {
      token,
      expiresIn
    };
  }

  return '';
});

export const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.payload.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(tokenRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(tokenRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (typeof action.payload === 'object') {
        state.payload = action.payload;
        localStorage.setItem('token', state.payload.token);
        localStorage.setItem('expires_in', JSON.stringify(state.payload.expires_in));
      }
    });

    builder.addCase(tokenRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    builder.addCase(saveToken.fulfilled, (state, action) => {
      if (typeof action.payload === 'object') {
        state.payload.token = action.payload.token || '';
        state.payload.expires_in = +action.payload.expiresIn || 0;
      }
    });
  }
});

export default tokenSlice.reducer;
