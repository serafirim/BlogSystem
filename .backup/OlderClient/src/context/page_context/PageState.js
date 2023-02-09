import {createContext, useReducer} from 'react';
import axios from 'axios';
import pageReducer from './pageReducer';
import * as ActionTypes from '../ContextActions';

export const PageContext = createContext();

export default function PageState(props){
    const initialstate = {
        pages: null,
        currentPage: null,
        toasts: null,
        pageCreated: false
    }

    const [state, dispatch] = useReducer(pageReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
        }
    }

    // #region --------------[ Actions ]--------------

    const getPages = async () => {
        try {
            const res = await axios.get('/api/v1/pages', config);
            dispatch({
                type: ActionTypes.GET_PAGES_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PAGE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getPageById = async (pageId) => {
        try {
            dispatch({
                type: ActionTypes.GET_PAGE_BY_ID,
                payload: pageId
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PAGE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createPage = async (pageData) => {
        try {
            const res = await axios.post('/api/v1/page/create', pageData, config);
            dispatch({
                type: ActionTypes.NEW_PAGE_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PAGE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updatePage = async (pageData) => {
        try {
            const res = await axios.put(`/api/v1/page/update/${pageData._id}`, pageData, config);
            dispatch({
                type: ActionTypes.UPDATE_PAGE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PAGE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deletePage = async (pageId) => {
        try {
            const res = await axios.delete(`/api/v1/page/delete/${pageId}`, config);
            dispatch({
                type: ActionTypes.PAGE_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PAGE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearPages = async () => {
        dispatch({
            type: ActionTypes.CLEAR_PAGES
        })
    }

    const clearCurrentPage = () =>{
        dispatch({type: ActionTypes.CLEAR_CURRENT_PAGE})
    }

    // #endregion

    return (
        <PageContext.Provider value={{
            pages: state.pages,
            currentPage: state.currentPage,
            toasts: state.toasts,
            pageCreated: state.pageCreated,
            
            clearCurrentPage,
            getPages,
            getPageById,
            createPage,
            updatePage,
            deletePage,
            clearErrors,
            clearPages

        }}>
            {props.children}
        </PageContext.Provider>
    )
}