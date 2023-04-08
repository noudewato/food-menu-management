import { CATEGORY_LIST_FAILED, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstant";
import axios from "axios";

export const listAdminCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/categories");

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
