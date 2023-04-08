import { CATEGORY_LIST_FAILED, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstant";


export const categoryListAdminReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case CATEGORY_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
