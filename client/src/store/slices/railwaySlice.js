import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
};

export const getRailwayData = createAsyncThunk(
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
      .addCase(getRailwayData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRailwayData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export const railwayData = (state) => state.railway.data;

export default railwaySlice.reducer;
