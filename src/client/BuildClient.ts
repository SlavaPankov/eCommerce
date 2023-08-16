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

class MyTokenCache implements TokenCache {
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
    console.log(cache);
    localStorage.setItem('tokenCache', JSON.stringify(cache));
    this.tokenStore = cache;
  }
}

const tokenCache = new MyTokenCache();

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
  .withLoggerMiddleware()
  .build();

export const ctpExistingFlow = new ClientBuilder()
  .withProjectKey(apiConfig.projectKey)
  .withExistingTokenFlow(tokenCache.get().token, { force: true })
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot = () => {
  const tokenLS = localStorage.getItem('test');

  if (tokenLS && !process.env.USERNAME && !process.env.PASSWORD) {
    return createApiBuilderFromCtpClient(ctpExistingFlow);
  }

  if (process.env.USERNAME && process.env.PASSWORD) {
    console.log('this');
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
      .withLoggerMiddleware()
      .build();

    return createApiBuilderFromCtpClient(ctpPasswordClient);
  }

  return createApiBuilderFromCtpClient(ctpAnonymousClient);
};
