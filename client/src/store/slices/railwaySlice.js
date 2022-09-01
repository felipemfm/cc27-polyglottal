import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchRailwayData = createAsyncThunk(
  "railway/getRailwayData",
  async (lineOrStation) => {
    const response = await axios.get(`http://localhost:8000/railway/${lineOrStation}`);
    return response.data;
  }
);

export const railwaySlice = createSlice({
  name: "railway",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRailwayData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRailwayData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export const railwayState = (state) => state.railway.data;

export default railwaySlice.reducer;
