// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   data: [],
// };
// export const GetAllDataOfModelWithoutImgReducer = createSlice({
//   name: "GetAllDataOfModelWithoutImgReducer",
//   initialState,
//   reducers: {
//     fetchData: (state, action) => {
//       state.data = action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { fetchData } = GetAllDataOfModelWithoutImgReducer.actions;

// export default GetAllDataOfModelWithoutImgReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  url: "",
  apiKey: "",
  token: "",
};

export const GetAllDataOfModelWithoutImgReducer = createSlice({
  name: "GetAllDataOfModelWithoutImgReducer",
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

export const { fetchData } = GetAllDataOfModelWithoutImgReducer.actions;

export default GetAllDataOfModelWithoutImgReducer.reducer;
