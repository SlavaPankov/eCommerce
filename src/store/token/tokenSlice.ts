/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiConfig } from '../../cfg/apiConfig';

interface IToken {
  token: string;
  expires_in: number;
  refresh_token: string;
  created_at: number;
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
    expires_in: 0,
    refresh_token: '',
    created_at: 0
  }
};

export const anonymousTokenRequestAsync = createAsyncThunk('token/getAnonymousToken', async () => {
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
      return {
        token: data.access_token,
        expires_in: data.expires_in * 1000,
        refresh_token: data.refresh_token,
        created_at: Date.now()
      };
    })
    .catch((error: AxiosError) => error.message);
});

export const passwordFlowTokenRequestAsync = createAsyncThunk(
  'token/getPasswordToken',
  async () => {}
);

export const refreshTokenRequestAsync = createAsyncThunk(
  'token/refreshToken',
  async (token: string) => {
    return axios
      .post(
        `${apiConfig.authUrl}/oauth/token`,
        {
          grant_type: 'refresh_token',
          refresh_token: token
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
        return {
          token: data.access_token,
          expires_in: data.expires_in * 1000,
          refresh_token: data.refresh_token,
          created_at: Date.now()
        };
      })
      .catch((error: AxiosError) => error.message);
  }
);

export const saveToken = createAsyncThunk('token/saveToken', () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh_token');
  const expiresIn = localStorage.getItem('expires_in');
  const createAt = localStorage.getItem('create_at');
  if (token && expiresIn && refreshToken && createAt) {
    return {
      token,
      expiresIn,
      refreshToken,
      createAt
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
    builder.addCase(anonymousTokenRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(anonymousTokenRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (typeof action.payload === 'object') {
        state.payload = action.payload;
        localStorage.setItem('token', state.payload.token);
        localStorage.setItem('expires_in', JSON.stringify(state.payload.expires_in));
        localStorage.setItem('refresh_token', JSON.stringify(state.payload.refresh_token));
        localStorage.setItem('create_at', JSON.stringify(state.payload.created_at));
      }
    });

    builder.addCase(anonymousTokenRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    builder.addCase(refreshTokenRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(refreshTokenRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (typeof action.payload === 'object') {
        state.payload = action.payload;
        localStorage.setItem('token', state.payload.token);
        localStorage.setItem('expires_in', JSON.stringify(state.payload.expires_in));
        localStorage.setItem('refresh_token', JSON.stringify(state.payload.refresh_token));
        localStorage.setItem('create_at', JSON.stringify(state.payload.created_at));
      }
    });

    builder.addCase(refreshTokenRequestAsync.rejected, (state, action) => {
      state.loading = false;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    builder.addCase(saveToken.fulfilled, (state, action) => {
      if (typeof action.payload === 'object') {
        state.payload.token = action.payload.token || '';
        state.payload.expires_in = +action.payload.expiresIn || 0;
        state.payload.refresh_token = action.payload.refreshToken || '';
        state.payload.created_at = +action.payload.createAt || 0;
      }
    });
  }
});

export default tokenSlice.reducer;
