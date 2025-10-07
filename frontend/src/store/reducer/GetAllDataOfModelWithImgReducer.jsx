import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  url: "",
  apiKey: "",
  token: "",
};

export const GetAllDataOfModelWithImgReducer = createSlice({
  name: "GetAllDataOfModelWithImgReducer",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.data = action.payload.api || [];
      state.url = action.payload.api?.[0]?.url || "";
      state.apiKey = action.payload.api?.[0]?.apiKey || "";
      state.token = action.payload.api?.[0]?.token || "";
    },
  },
});

export const { fetchData } = GetAllDataOfModelWithImgReducer.actions;

export default GetAllDataOfModelWithImgReducer.reducer;
