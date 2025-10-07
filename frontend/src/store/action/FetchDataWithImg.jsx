import axios from "axios";
import PaymentService from "../../component/payment/PaymentService";
import { fetchData } from "../reducer/GetAllDataOfModelWithImgReducer";

export const fetchDataWithImg = () => async (dispatch) => {
  try {
    const result = await PaymentService.generateAPIWithPaymentCheck("crud-with-image-get-all-model-with-data");
    
    if (result.requiresPayment) {
      throw new Error("Payment required for this feature");
    }

    if (result.success) {
      dispatch(fetchData(result.data));
      return result.data;
    } else {
      throw new Error(result.error || "Failed to fetch data");
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
