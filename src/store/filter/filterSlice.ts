/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilter {
  [k: string]: string;
}

interface IFilterState {
  filter: IFilter;
}

const initialState: IFilterState = {
  filter: {}
};

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<IFilter>) => {
      state.filter = {
        ...state.filter,
        ...action.payload
      };
    }
  }
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
