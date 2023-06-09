import axios from 'axios';

import { ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL, 
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

const base_url = "http://localhost:4000";

export const getProducts = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try{
        dispatch({type: ALL_PRODUCTS_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
        }

const { data } = await axios.get(base_url + link);

dispatch({ 
    type: ALL_PRODUCTS_SUCCESS,
    payload: data 
})

    }catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
} 


export const getProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCTS_DETAILS_REQUEST});

const { data } = await axios.get(base_url + `/api/v1/products${id}`);

dispatch({ 
    type: PRODUCTS_DETAILS_SUCCESS,
    payload: data.product
})

    }catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
} 


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}