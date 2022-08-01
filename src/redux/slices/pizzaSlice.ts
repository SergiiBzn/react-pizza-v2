import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Version 1
// type FetchPizzasArgs = {
//   sortBy: string;
//   order: string;
//   category: string;
//   search: string;
//   currentPage: string;
// };

// Version 2
// type FetchPizzasArgs = Record <string, string>;

// Business logic separated from render

type Pizza = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
};

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk <Pizza[], SearchPizzaParams> ('pizza/fetchPizzasStatus', 
  async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get <Pizza[]>(
    `https://62c6a6802b03e73a58d31660.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction <Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    })

    builder.addCase(fetchPizzas.rejected, (state,action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  },

  // not for TypeScript:
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
