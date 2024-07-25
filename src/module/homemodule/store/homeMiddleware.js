import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_DATA_UPDATE, COUNT_DATA_UPDATE } from "./actionTypes";
export const homeMiddleWare = createAsyncThunk(
  HOME_DATA_UPDATE,
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { homeReducer } = getState();
      const { homeData } = homeReducer;
      console.log(homeData, "find homeData form getState()");
      console.log(payload, "fin payload from dispatch");
      return payload;
    } catch {
      return rejectWithValue(error);
    }
  }
);
export const countMiddleWare = createAsyncThunk(
  COUNT_DATA_UPDATE,
  async (countadd, { rejectWithValue, getState }) => {
    try {
      // const { homeReducer } = getState();
      // const { homeData } = homeReducer;
      // console.log(homeData, "find homeData form getState()");
      console.log(countadd, "fin payload from dispatch");
      return countadd;
    } catch {
      return rejectWithValue(error);
    }
  }
);
