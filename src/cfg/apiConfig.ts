interface IApiConfig {
  baseUrl: string;
  authUrl: string;
  projectKey: string;
  scope: string;
}

export const apiConfig: IApiConfig = {
  baseUrl: 'https://api.europe-west1.gcp.commercetools.com',
  authUrl: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce_f1nal',
  scope:
    'view_categories:ecommerce_f1nal manage_my_shopping_lists:ecommerce_f1nal manage_customers:ecommerce_f1nal view_published_products:ecommerce_f1nal manage_my_orders:ecommerce_f1nal manage_my_profile:ecommerce_f1nal view_discount_codes:ecommerce_f1nal create_anonymous_token:ecommerce_f1nal manage_my_quote_requests:ecommerce_f1nal manage_my_quotes:ecommerce_f1nal view_orders:ecommerce_f1nal view_shipping_methods:ecommerce_f1nal manage_my_payments:ecommerce_f1nal view_payments:ecommerce_f1nal manage_my_business_units:ecommerce_f1nal view_cart_discounts:ecommerce_f1nal'
};
