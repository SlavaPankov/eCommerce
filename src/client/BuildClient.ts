import fetch from 'node-fetch';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  TokenCache,
  TokenStore
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { apiConfig } from '../cfg/apiConfig';

export class MyTokenCache implements TokenCache {
  private tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: ''
  };

  get(): TokenStore {
    const tokenLS = localStorage.getItem('tokenCache');

    if (!tokenLS) {
      return this.tokenStore;
    }

    return JSON.parse(tokenLS);
  }

  set(cache: TokenStore): void {
    localStorage.setItem('tokenCache', JSON.stringify(cache));
    this.tokenStore = cache;
  }
}

export const tokenCache = new MyTokenCache();

const anonymousAuthMiddlewareOptions: AuthMiddlewareOptions = {
  host: apiConfig.authUrl,
  projectKey: apiConfig.projectKey,
  credentials: {
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.SECRET || ''
  },
  scopes: [apiConfig.scope],
  fetch,
  tokenCache
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiConfig.baseUrl,
  fetch
};

export const ctpAnonymousClient = new ClientBuilder()
  .withProjectKey(apiConfig.projectKey)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const ctpExistingFlow = new ClientBuilder()
  .withProjectKey(apiConfig.projectKey)
  .withExistingTokenFlow(`Bearer ${tokenCache.get().token}`, { force: true })
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const getApiRoot = () => {
  const isAuth = localStorage.getItem('isAuth');

  if (isAuth && !process.env.USERNAME && !process.env.PASSWORD) {
    return createApiBuilderFromCtpClient(ctpExistingFlow);
  }

  if (process.env.USERNAME && process.env.PASSWORD) {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: apiConfig.authUrl,
      projectKey: apiConfig.projectKey,
      credentials: {
        clientId: process.env.CLIENT_ID || '',
        clientSecret: process.env.SECRET || '',
        user: {
          username: process.env.USERNAME || '',
          password: process.env.PASSWORD || ''
        }
      },
      scopes: [apiConfig.scope],
      fetch,
      tokenCache
    };

    const ctpPasswordClient = new ClientBuilder()
      .withProjectKey(apiConfig.projectKey)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();

    return createApiBuilderFromCtpClient(ctpPasswordClient);
  }

  return createApiBuilderFromCtpClient(ctpAnonymousClient);
};
