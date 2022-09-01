import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  stationTimeTable: [],
  status: "idle",
};

export const fetchRailwayData = createAsyncThunk(
  "railway/fetchRailwayData",
  async (lineOrStation) => {
    const response = await axios.get(
      `http://localhost:8000/railway/${lineOrStation}`
    );
    return response.data;
  }
);

export const fetchStationTimeTable = createAsyncThunk(
  "railway/fetchStationTimeTable",
  async (url) => {
    const response = await axios(
      `http://localhost:8000/railway/stationTimeTable/${url}`
    );
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
      })
      .addCase(fetchStationTimeTable.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStationTimeTable.fulfilled, (state, action) => {
        state.status = "idle";
        state.stationTimeTable = action.payload;
      });
  },
});

export const railwayState = (state) => state.railway.data;

export default railwaySlice.reducer;
