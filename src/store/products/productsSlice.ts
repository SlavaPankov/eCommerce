/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/interfaces/IProduct';
import { createProductsFromResponse } from '../../utils/createProductsFromResponse';
import { apiConfig } from '../../cfg/apiConfig';
import { getApiRoot } from '../../client/BuildClient';

interface IPayloadItem {
  products: Array<IProduct>;
  totalCount: number;
}

interface IPayload {
  products: IPayloadItem;
  filter: IPayloadItem;
}

interface IProductsState {
  loading: boolean;
  error: string;
  offset: number;
  payload: IPayload;
}

const initialState: IProductsState = {
  offset: 0,
  loading: false,
  error: '',
  payload: {
    products: {
      products: [],
      totalCount: 0
    },
    filter: {
      products: [],
      totalCount: 0
    }
  }
};

interface IProductsRequestProps {
  offset: number;
}

export const productsRequestAsync = createAsyncThunk(
  'products/getProducts',
  async ({ offset }: IProductsRequestProps, { rejectWithValue }) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .productProjections()
      .get({
        queryArgs: {
          offset
        }
      })
      .execute()
      .then(({ body: { results } }): Array<IProduct> => createProductsFromResponse(results))
      .catch(({ body }) => {
        return rejectWithValue(body.errors?.[0].code);
      });
  }
);

interface IProductsFiltersRequestAsync {
  filter: Array<string>;
  limit?: number;
  offset?: number;
  sort?: Array<string>;
  text?: string;
  fuzzy?: boolean;
  fuzzyLevel?: number;
}

interface IFilteredResults {
  products: Array<IProduct>;
  totalCount: number;
}

export const productsFiltersRequestAsync = createAsyncThunk(
  'products/getFilteredProducts',
  async (
    {
      filter,
      sort = [''],
      limit = 9,
      offset = 0,
      text = '',
      fuzzy = false,
      fuzzyLevel = 0
    }: IProductsFiltersRequestAsync,
    { rejectWithValue }
  ) => {
    return getApiRoot()
      .withProjectKey({ projectKey: apiConfig.projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter,
          limit,
          offset,
          fuzzy,
          fuzzyLevel,
          sort,
          'text.ru': text
        }
      })
      .execute()
      .then(
        ({ body }): IFilteredResults => ({
          products: createProductsFromResponse(body.results),
          totalCount: body.total || body.count
        })
      )
      .catch(({ body }) => {
        return rejectWithValue(body.errors?.[0].code);
      });
  }
);

export const productsSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    productsLoading: (state) => {
      state.loading = true;
    },

    productsLoadingSuccess: (state, action: PayloadAction<Array<IProduct>>) => {
      console.log(action.payload);
      state.loading = false;
      state.payload.products.products = action.payload;
    },

    productsLoadingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    setOffset: (state, action: PayloadAction<number>) => {
      state.offset += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(productsRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(productsRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.payload.products.products = action.payload;
      }
    });

    builder.addCase(productsRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });

    builder.addCase(productsFiltersRequestAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(productsFiltersRequestAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.products)) {
        state.payload.filter.products = action.payload.products;
        state.payload.filter.totalCount = action.payload.totalCount;
      }
    });

    builder.addCase(productsFiltersRequestAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = `${action.payload}`;
    });
  }
});

export const { setOffset } = productsSlice.actions;

export default productsSlice.reducer;
