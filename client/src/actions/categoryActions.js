import { CATEGORY_CREATE_FAILED, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_FAILED, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DETAILS_FAILED, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_LIST_FAILED, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAILED, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS } from "../constants/categoryConstant";
import axios from "axios";

export const listAdminCategories = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

     const {
       userLogin: { userInfo },
     } = getState();

     const config = {
       headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${userInfo.token}`,
       },
     };

    const { data } = await axios.get("/api/categories", config);

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

export const listCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/categories/${id}`);

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/categories/${category._id}`,
      category,
      config
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (categoryData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/categories/", categoryData,
      config
    );

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/categories/${id}`, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
