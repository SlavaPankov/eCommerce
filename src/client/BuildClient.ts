import fetch from 'node-fetch';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const PROJECT_KEY = 'ecommerce_f1nal';
const SCOPES = [
  'view_categories:ecommerce_f1nal',
  'manage_my_shopping_lists:ecommerce_f1nal',
  'view_published_products:ecommerce_f1nal',
  'manage_my_orders:ecommerce_f1nal',
  'manage_my_profile:ecommerce_f1nal',
  'create_anonymous_token:ecommerce_f1nal',
  'manage_my_quote_requests:ecommerce_f1nal',
  'manage_my_quotes:ecommerce_f1nal',
  'manage_my_payments:ecommerce_f1nal',
  'manage_my_business_units:ecommerce_f1nal'
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.SECRET || ''
  },
  scopes: SCOPES,
  fetch
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot = () => createApiBuilderFromCtpClient(ctpClient);
