import { configureStore } from "@reduxjs/toolkit";
import GetAllDataOfModelWithoutImgReducer from "./reducer/GetAllDataOfModelWithoutImgReducer";
import GetAllDataOfModelWithImgReducer from "./reducer/GetAllDataOfModelWithImgReducer";

export default configureStore({
  reducer: {
    withoutImg: GetAllDataOfModelWithoutImgReducer,
    withImg: GetAllDataOfModelWithImgReducer,
  },
});
