import axiosInstance from "../../config/axiosConfig";
import { fetchData } from "../reducer/GetAllDataOfModelWithoutImgReducer";

export const fetchDataWithoutImg = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      "/api/generate-key",
      { feature: "crud-get-all-models-with-data" }
    );
    dispatch(fetchData(response.data));
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
