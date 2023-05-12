import { createAction  } from "../../utils/Reducer/reducer";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

export const fetchCategoriesStart = () => (createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = (categoriesArray) => 
(createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = (error) => 
(createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

// Function that returns a function that gets a dispatch 
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error)); 
    }
}