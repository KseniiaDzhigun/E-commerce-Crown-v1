import { all, takeLatest, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";


export function* fetchCategoriesAsync() {
    try {
        // instead of await getCategoriesAndDocuments('categories')
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        //put is a generator version of dispatch
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

//We are responding to categories start
export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}