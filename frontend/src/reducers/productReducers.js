import { ADD_NEW_PRODUCT_FAIL, ADD_NEW_PRODUCT_REQUEST, ADD_NEW_PRODUCT_SUCCESS, ADD_PRODUCT_REVIEW_FAIL, ADD_PRODUCT_REVIEW_REQUEST, ADD_PRODUCT_REVIEW_RESET, ADD_PRODUCT_REVIEW_SUCCESS, ADD_TO_COMMENT_FAIL, ADD_TO_COMMENT_REQUEST, ADD_TO_COMMENT_SUCCESS, GET_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, GET_PRODUCT_REVIEW_FAIL, GET_PRODUCT_REVIEW_REQUEST, GET_PRODUCT_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }

}

export const productDetailReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export const addNewProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ADD_NEW_PRODUCT_REQUEST:
            return { loading: true };
        case ADD_NEW_PRODUCT_SUCCESS:
            return { loading: false, products: action.payload };
        case ADD_NEW_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const addNewReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REVIEW_REQUEST:
            return { loading: true };
        case ADD_PRODUCT_REVIEW_SUCCESS:
            return { loading: false, review: action.payload };
        case ADD_PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case ADD_PRODUCT_REVIEW_RESET:
            return {};
        default:
            return state;
    }
}

export const getReviewReducer = (state = { reviewList: [] }, action) => {
    switch (action.type) {
        case GET_PRODUCT_REVIEW_REQUEST:
            return { loading: true };
        case GET_PRODUCT_REVIEW_SUCCESS:
            return { loading: false, reviewList: action.payload };
        case GET_PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export const commentsListReducer = (state = { comment: {} }, action) => {
    switch (action.type) {
        case ADD_TO_COMMENT_REQUEST:
            return { loading: true };
        case ADD_TO_COMMENT_SUCCESS:
            return { loading: false, comment: action.payload };
        case ADD_TO_COMMENT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;

    }
}


export const getCommentsListReducer = (state = { commentList: []},action) => {
    switch (action.type) {
        case GET_COMMENT_REQUEST:
            return { loading: true };
        case GET_COMMENT_SUCCESS:
            return { loading: false, commentList: action.payload };
        case GET_COMMENT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}