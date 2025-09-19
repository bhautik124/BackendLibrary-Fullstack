import axios from "axios";
import { fetchData } from "../reducer/GetAllDataOfModelWithImgReducer";

export const fetchDataWithImg = () => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://backendlibrary-fullstack-backend.onrender.com/api/generate-key",
      { feature: "crud-with-image-get-all-model-with-data" },
      { withCredentials: true }
    );
    dispatch(fetchData(response.data));
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
